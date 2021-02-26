FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY node_modules ./node_modules
COPY migrations ./migrations
COPY dist ./dist

EXPOSE 3000
CMD [ "npm", "run-script start:prod" ]
