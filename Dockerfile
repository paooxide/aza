FROM node:14-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install 

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start" ]

 