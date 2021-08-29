FROM node:10

WORKDIR /app

COPY controllers /app/controllers
COPY models /app/models
COPY graphql /app/graphql
COPY config /app/config
COPY index.js /app
COPY package.json /app

RUN npm install
RUN npm install apollo-client apollo-cache-inmemory apollo-link-http react-apollo graphql-tag graphql --save
CMD ["node", "/app/index.js"]
