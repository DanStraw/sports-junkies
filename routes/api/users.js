const router = require("express").Router();
const userController = require("../../controllers/usersController.js")

router
    .post("/", (req,res,next) => {
        userController.create(req.body, res)
    })
    .delete("/:id", (req,res,next) => {
        userController.remove(req)
    })
    .get("/:id", (req,res,next) => {
        userController.findById(req)
    })

module.exports = router;

