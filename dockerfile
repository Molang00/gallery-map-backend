FROM node:12.19.0-alpine3.9 AS development

WORKDIR /workdir

COPY package*.json ./

RUN apk update

RUN apk add --no-cache bash

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /workdir

COPY package*.json ./

RUN npm install --only=production

EXPOSE 3030

COPY . .

COPY --from=development /workdir/dist ./dist

CMD ["node", "dist/main"]
