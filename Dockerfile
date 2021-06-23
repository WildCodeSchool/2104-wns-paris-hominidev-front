FROM node:14.16-alpine

# If you have native dependencies, you'll need extra tools
RUN apk add --no-cache make gcc g++ python3

WORKDIR /browserExtension
ENV PATH /browserExtension/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY .env ./
RUN yarn

CMD ["yarn", "start"]