REACT TIME
1) npx create-react-app client
2) npm i --save concurrently
3)  add the following lines to server (not react) package.json
    "server": "env-cmd -f ./config/dev.env nodemon src/index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
4) npm install http-proxy-middleware --save
5) create setupProxy.js in client/src/
 with the same code as in this workspace

6) use the following command in the react workspace
    npm add @babel/runtime

7) use
    npm run dev

8) npm run build each time you need a new build
9) delete boiler plate (other than setupProxy and serviceWorker)

10) create the following
    index.js - for redux stuff
    App.js - for react-router stuff

11) make sure we're in client (react) directory run
    npm install redux react-redux react-router-dom materialize-css