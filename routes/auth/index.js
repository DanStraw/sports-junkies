const router = require("express").Router();
const passport = require('passport')

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.send('logging in')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get(
    '/google/callback', 
    passport.authenticate('google', {
      successRedirect: '/#/home',
	  failureRedirect: '/#/login'
  }),
)

router.get('/user', (req, res, next) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

module.exports = router;