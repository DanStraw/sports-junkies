const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const betController = require('../../controllers/betscontroller')

router
  .post("/",(req,res,next) => {
    betController.create([req.body, id])
  })
  .get("/", (req,res,next) => {    
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

module.exports = router;