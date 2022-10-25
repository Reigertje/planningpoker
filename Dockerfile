# syntax=docker/dockerfile:1

FROM node:16

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Bundle app source
COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install --production

# Add source code
COPY . .

RUN yarn build

# Clean-up app directory
RUN rm -rf frontend

# Run app
EXPOSE 8080

ENTRYPOINT [ "/usr/local/bin/node", "main.js" ]
