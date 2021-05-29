var express = require('express');
var app = express();
var indexRouter = require('./routers/request');


var mongoose = require('mongoose');
var dev_db_url = 'mongodb://127.0.0.1:4000/Myrecipe'
var mongoDB = dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', function(){console.log ('MongoDB connection error')});
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
db.on('connected', function(){
    var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listening at :5000...");
    console.log("Mongoose default connection is open to ", dev_db_url);
    });
});