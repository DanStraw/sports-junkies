const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys.js')
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user)=> {
        done(null, user)
    })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleCreds.clientID,
        clientSecret: keys.googleCreds.clientSecret,
        callbackURL: '/auth/google/callback' 
    }, (accessToken, refreshToken, profile, done) => {
        const { id, name, emails } = profile
        User.findOne({googleId: profile.id}, (err, userMatch) => {
            if(err) {
                console.log('Error trying to find user with this ID:')
                console.log(err)
            }
            if (userMatch) {
                return done(null, userMatch)
            } else {
                const newUser = new User({
                    firstName: name.givenName,
                    lastName: name.familyName,
                    googleId: id,
                    email: emails[0].value
                })
                newUser.save((err, savedUser) => {
                    if (err) {
                    } else {
                        return done(null, savedUser)
                    }
                })
            }
        })
    })
)