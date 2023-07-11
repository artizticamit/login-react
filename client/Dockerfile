# Docker file for react

FROM node:10.16-alpine

#working Directory
WORKDIR /usr/src/app

COPY package*.json  ./

## installing dependencies
RUN npm install --silent

#/copy files to app folder
COPY . .

EXPOSE 3000
CMD ["npm","start"]
