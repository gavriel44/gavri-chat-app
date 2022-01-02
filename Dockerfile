FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node ./back-end .

COPY --chown=node:node ./front-end/build ./build

RUN npm ci

RUN npm run tsc

EXPOSE $PORT

CMD npm start