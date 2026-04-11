FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

ENV WS_PORT=2025

EXPOSE 2025

CMD ["npm", "run", "start"]
