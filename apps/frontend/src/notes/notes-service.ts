import React from "react";
import LernaDocument from "./lerna.md";
import IngressDocument from "./ingress.md";
import AzurePipelinesYamlDocument from "./azure-pipelines-yaml.md";
import InstallHelmChartDocument from "./install-helm-chart.md";
import type { Note, NoteSlug } from "./note";

export const notes: Note[] = [
  {
    title: "Lerna",
    slug: "lerna",
  },
  {
    title: "Nginx Ingress YAML",
    slug: "nginx-ingress-yaml",
  },
  {
    title: "Azure Pipelines YAML",
    slug: "azure-pipelines-yaml",
  },
  {
    slug: "install-helm-chart",
    title: "Install helm chart",
  },
];

export function getNoteDocument(slug: NoteSlug): React.ComponentType {
  switch (slug) {
    case "lerna": {
      return LernaDocument;
    }
    case "nginx-ingress-yaml": {
      return IngressDocument;
    }
    case "azure-pipelines-yaml": {
      return AzurePipelinesYamlDocument;
    }
    case "install-helm-chart": {
      return InstallHelmChartDocument;
    }
    default: {
      return React.Fragment;
    }
  }
}
