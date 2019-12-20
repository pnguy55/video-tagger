To deploy client side to Heroku

we're basically just telling Heroku to install all dependencies on the server and to do the build over there

1) npm run build
2) add the following to root index.js of server

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

3) add this to package.json
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
