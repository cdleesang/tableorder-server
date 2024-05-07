ARG FUNCTION_DIR="/app"

FROM node:18.12 AS builder
ARG FUNCTION_DIR

WORKDIR ${FUNCTION_DIR}

COPY package.json yarn.lock .npmrc ./

RUN yarn install --frozen-lockfile 

COPY . .

RUN yarn prepare \
  && yarn prisma:generate \
  && yarn build \
  && npx -y nestia swagger 