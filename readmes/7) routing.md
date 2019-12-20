Making new routes in the backend:
1) create the routing file in the route directory
2) make the 
    module.export = app => {};
3) in src/index.js require in the route
    require('../routes/billingRoutes')(app);

