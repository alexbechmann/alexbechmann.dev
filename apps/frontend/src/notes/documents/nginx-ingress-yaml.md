---
title: Nginx Ingress YAML
---

# K8s Ingress with Nginx

## Prequisites

- Nginx Ingress Controller installed.
- Cert manager installed
- Certificate issuer with name "letsencrypt-prod" exists in target namespace.
- DNS for all hosts point to your Nginx ingress controller service load balancer IP.

## Ingress YAML

Example of an ingress resource with multiple hosts. Each host will receive a valid SSL from letsencrypt.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  namespace: "{{ .Release.Namespace }}"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    kubernetes.io/ingress.class: nginx
spec:
  tls:
    - hosts:
        - dotdev-{{ .Values.env }}.alexbechmann.dev
      secretName: dotdev-{{ .Values.env }}.alexbechmann.dev
    - hosts:
        - alexbechmann.dev
      secretName: alexbechmann.dev
  rules:
    - host: dotdev-{{ .Values.env }}.alexbechmann.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 3000
    - host: alexbechmann.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 3000
```
