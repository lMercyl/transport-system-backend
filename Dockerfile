FROM node:14

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

ENV MONGODB_URI=mongodb://transport-system:27017/transport-system

CMD ["yarn", "start"]
