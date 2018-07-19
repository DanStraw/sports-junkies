const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const userController = require('./controllers/usersController');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CB_URL
},
function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

passport.serializeUser(function (user, cb) {
  console.log('serialize:', user)
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

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

// if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
// }

app.get('/home',
function (req, res) {
  res.send('home');
});

app.get('/login',
  function (req, res) {
    res.render('/');
});

app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/#/home');
  });

app.use(routes);


app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});