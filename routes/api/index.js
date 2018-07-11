const router = require("express").Router();
const userController = require("../../controllers/usersController.js")
const betController = require("../../controllers/betsController.js");

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
    .post("/bets",(req,res,next) => {
        betController.create(req.body)
    })

module.exports = router;