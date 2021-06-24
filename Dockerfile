FROM node:14.16-alpine

WORKDIR /browserExtension
ENV PATH /browserExtension/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .env ./

RUN yarn
# native dependencies, need extra tools
RUN apk add --no-cache make gcc g++ python3
# edit tools, just in case
RUN apk add --no-cache nano
COPY webpack.config.js ./

CMD ["yarn", "start"]