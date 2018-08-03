const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys.js')
const User = require('../models/user');

passport.serializeUser((profile, done) => {
    done(null, profile);
});

passport.deserializeUser((id, done) => {
    done(null, id)
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleCreds.clientID,
        clientSecret: keys.googleCreds.clientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const { id, name, emails } = profile
        User.findOne({googleId: profile.id}, (err, userMatch) => {
            if(err) {
                console.log('Error trying to find user with this ID:')
                console.log(err)
            }
            if (userMatch) {
                return done(null, profile)
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
                        console.log('user saved:', savedUser)
                        return done(null, savedUser)
                    }
                })
            }
        })
    })
)