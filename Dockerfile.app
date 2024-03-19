FROM node:21-alpine3.18
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:dev"]