FROM hub.noths.com/node:6-alpine

COPY package.json ./

RUN npm install

COPY . ./

ENV NODE_ENV=production
EXPOSE 3333
CMD npm run start
