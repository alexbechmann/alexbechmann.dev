---
title: Azure Pipelines YAML
---

# Azure pipelines YAML useful snippets

## Conditions

### On master branch only

```yaml
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/master'))
```

### Multiple conditions

```yaml
condition: |
  and(
    succeeded(),
    eq(variables['System.PullRequest.TargetBranch'], 'refs/heads/master'),
    ne(variables['Build.SourceBranch'], 'refs/heads/master')
  )
```
