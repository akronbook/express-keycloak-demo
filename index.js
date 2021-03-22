var express = require('express');
var testController = require('./controller/test-controller.js');
var app = express();

app.get('/', function(req, res){
   res.send("Server is up!");
});

app.use('/test', testController);
app.listen(3000);