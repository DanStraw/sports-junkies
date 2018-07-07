const router = require("express").Router();
const userController = require("../../controllers/usersController.js")

router
    .post("/", (req,res,next) => {
        console.log('jello')
        userController.create(req.body)
    .get("/:id", (req, res,next) => {
        userController.findById(id)
    })
})

module.exports = router;