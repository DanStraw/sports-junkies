const router = require("express").Router();
const userController = require("../../controllers/usersController.js")
const betController = require("../../controllers/betsController.js");
let id = '';

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
        betController.create([req.body, id])
    })
    .get("/bets", (req,res,next) => {    
        betController.findAll((err,docs)=> {
            if(err) {
                console.log(err)
            }
            res.json(docs)
        })
    })
    .post('/seasonBet', (req,res,next) => {
        const team = {
            typeOfBet: 'championship_odds',
            team1: req.body.name,
            team1Line: req.body.odds,
            key: req.body.key
        }
        betController.create([team, id])
    })
    .get("/usersbets", (req,res,next) => {
        userController.findById([req, id],(err,docs)=>{
            if(err) console.log(err)
            res.json(docs)
        })
    })
    .post('/id', (req,res,next) => {
        id = req.body.id
    })
    

module.exports = router;