# Lerna with yarn workspaces

## Installation

```bash
npm init
```

### Init lerna

```bash
npx lerna init
```

### Edit package.json

```json
{
  "private": true,
  "workspaces": ["apps/**"],
  "scripts": {
    "dev": "lerna run dev --stream"
  }
}
```

## Edit lerna.json

```json
{
  "packages": ["apps/*"],
  "version": "0.1.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

## Add apps

```bash
cd ./apps
npx create-next-app frontend
```

## Ensure all apps have a dev script

Edit package.json

```json
{
  "scripts": {
    "dev": "next"
  }
}
```

## Run dev command

From root directory:

```bash
yarn dev
```
