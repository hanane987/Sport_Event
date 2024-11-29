FROM node:18-alpine

WORKDIR /frontend-activePlanner

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]