FROM node:15 AS builder

WORKDIR /app
COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY ./apps/frontend/package.json ./apps/frontend/
RUN yarn install --pure-lockfile
COPY ./apps/frontend/ ./apps/frontend/

WORKDIR /app/apps/frontend/
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
