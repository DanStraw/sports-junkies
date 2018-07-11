const router = require("express").Router();
const userController = require("../../controllers/usersController.js")

router
    .post("/users", (req,res,next) => {
        userController.create(req.body, res)
    })
    .delete("/users/:id", (req,res,next) => {
        userController.remove(req)
    })
    .get("/users/:id", (req,res,next) => {
        userController.findById(req)
    })

module.exports = router;