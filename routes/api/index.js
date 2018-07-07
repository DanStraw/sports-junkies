const router = require("express").Router();
const userController = require("../../controllers/usersController.js")

router
    .post("/users", (req, res,next) => {
        console.log(req.body)
        userController.create(req.body)
})

module.exports = router;