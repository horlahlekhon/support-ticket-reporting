FROM node:alpine

RUN mkdir -p /usr/src/support-reporting && chown -R node:node /usr/src/support-reporting

WORKDIR /usr/src/support-reporting

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000
