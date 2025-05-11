FROM node:22

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
