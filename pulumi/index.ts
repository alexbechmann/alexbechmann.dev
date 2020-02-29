import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import * as digitalocean from "@pulumi/digitalocean";

const sharedStack = new pulumi.StackReference(
  "alexbechmann/pulumi-home-k8s-shared/master"
);
const kubeconfig = sharedStack.getOutput("kubeconfig");
// const nginxIngressIp = sharedStack.getOutput('nginxIngressIp');
const provider = new k8s.Provider("shared-cluster", {
  kubeconfig
});
const env = pulumi.getStack().split("-")[0];
const project = "cv";
const publicIp = "100.64.81.158";

const dockerImage = new docker.Image("image", {
  build: "../app/",
  imageName: `alexbechmann/${project}:${env}`
});

const appName = `${project}-${env}`;
const appLabels = { app: appName };

const namespace = appName;

const appNamespace = new k8s.core.v1.Namespace(
  "namespace",
  {
    metadata: {
      name: namespace
    }
  },
  { provider }
);

const deployment = new k8s.apps.v1.Deployment(
  appName,
  {
    metadata: {
      namespace
    },
    spec: {
      selector: { matchLabels: appLabels },
      strategy: {
        rollingUpdate: { maxSurge: 5, maxUnavailable: 3 }
      },
      replicas: 2,
      template: {
        metadata: { labels: appLabels },
        spec: {
          containers: [
            {
              name: "app",
              imagePullPolicy: "Always",
              image: dockerImage.imageName,
              resources: {
                requests: {
                  cpu: "100m",
                  memory: "128Mi"
                },
                limits: {
                  cpu: "250m",
                  memory: "256Mi"
                }
              },
              ports: [{ containerPort: 3000 }],
              livenessProbe: {
                httpGet: {
                  path: "/",
                  port: 3000
                },
                initialDelaySeconds: 5,
                periodSeconds: 15
              }
            }
          ]
        }
      }
    }
  },
  { provider }
);

const appService = new k8s.core.v1.Service(
  appName,
  {
    metadata: {
      name: appName,
      namespace
    },
    spec: {
      ports: [
        {
          name: "app",
          port: 80,
          protocol: "TCP",
          targetPort: 3000
        }
      ],
      selector: {
        app: appName
      },
      type: "ClusterIP"
    }
  },
  { provider }
);

const hostPrefixes = [`${env}.${project}`];

if (env === "master") {
  hostPrefixes.push("cv");
}

hostPrefixes.forEach(hostPrefix => {
  const issuer: "staging" | "prod" = "prod";
  const secretName = `tls-${hostPrefix}-secret-${issuer}`;
  const host = `${hostPrefix}.alexbechmann.dev`;
  var dns = new digitalocean.DnsRecord(host, {
    ttl: 300,
    name: hostPrefix,
    domain: "alexbechmann.dev",
    type: "A",
    value: publicIp
  });
  const ingress = new k8s.networking.v1beta1.Ingress(
    host,
    {
      metadata: {
        name: hostPrefix,
        namespace,
        annotations: {
          "kubernetes.io/ingress.class": "nginx",
          "cert-manager.io/cluster-issuer": `letsencrypt-${issuer}`
          // 'ingress.kubernetes.io/force-ssl-redirect': 'true',,
          // 'kubernetes.io/tls-acme': 'true'
          // 'acme.cert-manager.io/http01-ingress-class': 'nginx'
        }
      },
      spec: {
        tls: [
          {
            hosts: [host],
            secretName
          }
        ],
        rules: [
          {
            host,
            http: {
              paths: [
                {
                  path: "/",
                  backend: {
                    serviceName: appService.metadata.name,
                    servicePort: 80
                  }
                }
              ]
            }
          }
        ]
      }
    },
    { provider }
  );

  // const sslCert = k8s.yaml.parse(
  //   {
  //     yaml: `
  //     apiVersion: cert-manager.io/v1alpha2
  //     kind: Certificate
  //     metadata:
  //       name: ${secretName}
  //     spec:
  //       secretName: ${secretName}
  //       dnsNames:
  //       - ${host}
  //       acme:
  //         config:
  //         - http01:
  //             ingressClass: nginx
  //           domains:
  //           - ${host}
  //       issuerRef:
  //         name: letsencrypt-prod
  //         kind: Issuer
  //       `
  //   },
  //   { provider }
  // );
});