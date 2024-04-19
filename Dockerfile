FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node", "/backend/models/user.model.js"]


