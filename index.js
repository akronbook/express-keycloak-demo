var express = require('express');
var app = express();

const keycloak = require('./config/keycloak-config.js').initKeycloak(app);
app.use(keycloak.middleware());

var testController = require('./controller/test-controller.js');
app.use('/test', testController);

app.get('/', function(req, res){
   res.send("Server is up!");
});
app.listen(3000);