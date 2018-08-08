const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const betsController = require('../../controllers/betscontroller')

router
  .post("/",(req,res,next) => {
    betsController.create([req.body.betData, req.body.id])
  })
  .get("/", (req,res,next) => {    
    betsController.findAll((err,docs)=> {
        if(err) {
            console.log(err)
        }
        res.json(docs)
    })
  })
  .post('/seasonBet', (req,res,next) => {
    const team = {
        typeOfBet: 'championship_odds',
        team1: req.body.team.name,
        team1Line: req.body.team.odds,
    }
    betsController.create([team, req.body.id])
  })
  .get("/usersBets/:id", (req,res,next) => {
    usersController.findById(req.params.id,(err,docs)=>{
        if(err) console.log(err)
        res.json(docs)
    })
  })

module.exports = router;