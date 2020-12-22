export interface Note {
  title: string;
  slug: NoteSlug;
  //   Document: React.ComponentType;
}

export type NoteSlug =
  | "lerna"
  | "nginx-ingress-yaml"
  | "install-helm-chart"
  | "azure-pipelines-yaml"
  | "install-helm-chart";
