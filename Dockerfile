FROM node:26-alpine3.23

WORKDIR /home/code

RUN apk add --no-cache git

RUN npm install --global yarn @nestjs/cli

EXPOSE 3000 9229