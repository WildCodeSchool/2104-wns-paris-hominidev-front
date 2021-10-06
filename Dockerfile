FROM node:14.16-alpine

# add tools & dependencies
RUN apk add --no-cache nano
RUN apk add --no-cache make gcc g++ python3

# create folder
WORKDIR /pygma-client-ext

# copy necessary conf files
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .env ./
COPY webpack.config.js ./

# launch script stuffs
COPY launch.sh ./
RUN chmod +x ./launch.sh
ENTRYPOINT ["/bin/sh", "./launch.sh"]
