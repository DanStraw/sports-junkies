const express = require("express");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const authRoutes = require("./routes/auth");
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3001;
var passport = require('passport');;
const passportSetup = require('./config/passport-setup');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sports-junkies");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['key1', 'key2']
}));

// if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
// }

app.get('/home',
function (req, res) {
  console.log('home')
});

app.get('/login',
  function (req, res) {
    res.render('/');
});


app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get((req,res,next)=>{
  res.sendStatus(404)
})

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});