FROM node:17-buster

# add tools & dependencies
RUN apt update
RUN apt -y install make nano gcc g++ python3
RUN apt clean

# create folder
WORKDIR /pygma-client-ext

# copy necessary conf files
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY .parcelrc ./

# launch script stuffs
COPY launch.sh ./
RUN chmod +x ./launch.sh
ENTRYPOINT ["/bin/sh", "./launch.sh"]
