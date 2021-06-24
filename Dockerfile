FROM node:14.16-alpine

WORKDIR /pygmaClientExt
ENV PATH /pygmaClientExt/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .env ./

# edit tools, just in case
RUN apk add --no-cache nano
# native dependencies, need extra tools
RUN apk add --no-cache make gcc g++ python3
RUN yarn

COPY webpack.config.js ./

CMD ["yarn", "start"]