FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY src/ ./src/

RUN npm install

EXPOSE 3000