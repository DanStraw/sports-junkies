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
    .get("/bets", (req,res,next) => {    
        betController.findAll((err,docs)=> {
            if(err) {
                console.log(err)
            }
            res.json(docs)
        })
    })
    .get("/bets/:id", (req,res,next) => {
        userController.findById(req,(err,docs)=>{
            if(err) console.log(err)
            res.json(docs)
        })
    })

module.exports = router;