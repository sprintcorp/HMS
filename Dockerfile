FROM node:16-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the HMS backend API."
LABEL maintainer = ["adetimifred@gmail.com"]


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD [ "npm", "run", "start:prod" ]