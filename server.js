const express = require("express");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();
const authRoutes = require("./routes/auth");
const apiRoutes = require('./routes/api');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sports-junkies");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('morgan')('combined'));

app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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