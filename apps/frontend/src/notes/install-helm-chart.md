# Install helm chart

Install a helm chart while accounting for first time run. It will install if it doesn't exist, and create namespace if it doesn't exist.

```bash
helm upgrade my-release-name repository-name/name-of-chart --namespace my-namespace --install --create-namespace
```
