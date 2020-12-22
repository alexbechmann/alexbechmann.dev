FROM node:12.10.0 AS builder

RUN apt-get update && apt-get install -y libvips-dev --no-install-recommends

WORKDIR /app
COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY ./apps/frontend/package.json ./apps/frontend/
RUN yarn install --pure-lockfile
COPY ./apps/frontend/ ./apps/frontend/

WORKDIR /app/apps/frontend/
RUN yarn build

WORKDIR /app
RUN yarn install --production

WORKDIR /app/apps/frontend/

EXPOSE 3000
CMD ["yarn", "start"]
