# pull base image
FROM node:alpine

# set working directory
WORKDIR /app

# add node_modules/.bin to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install yarn
RUN apk add --no-cache yarn

# install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# add app
COPY . ./

# start app
CMD ["yarn", "start"]
