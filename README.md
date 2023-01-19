# Planning Poker

## Installation

### Docker

1. Build docker image: `DOCKER_BUILDKIT=1 docker build . -t chriszo111/planningpawker:latest`
2. Run docker container: `docker run -d -it --rm -p 9000:8080/tcp chriszo111/planningpawker:latest`

You can now access the app by visiting `http://localhost:8080` in your browser.

### Node.js

#### Requirements

- Make sure you have `node.js`, `npm` and `yarn` installed.

#### Server

1. Run `npm install` in the root folder
2. Run server with `node main.js`

#### Frontend

1. Navigate to frontend directory `cd ./frontend`
2. Install packages `yarn install`
3. Start development server `yarn start`

You can now access the app by visiting `http://localhost:3000` in your browser. 
