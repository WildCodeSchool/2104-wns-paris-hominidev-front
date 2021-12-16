FROM node:16-bullseye

RUN apt update
# add tools & dependencies
RUN apt install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt -y install python3.9
# TO RESOLVE SEGMENT FAULT ERROR
# https://stackoverflow.com/questions/69598150/apple-mac-book-pro-m1-chip-segmentation-error-when-using-python-requests-library
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1
RUN update-alternatives --config python3

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
ENTRYPOINT [ "/bin/sh", "-c", "./launch.sh" ]