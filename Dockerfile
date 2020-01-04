FROM node:10

WORKDIR /app

COPY controllers /app/controllers
COPY models /app/models
COPY config /app/config
COPY index.js /app
COPY package.json /app

RUN npm install

CMD ["node", "/app/index.js"]