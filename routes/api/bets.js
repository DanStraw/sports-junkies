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
        team1: req.body.name,
        team1Line: req.body.odds,
        key: req.body.key
    }
    betsController.create([team, id])
  })
  .get("/usersBets/:id", (req,res,next) => {
    console.log('req.params.id:', req.params.id)
    usersController.findById(req.params.id,(err,docs)=>{
        if(err) console.log(err)
        res.json(docs)
    })
  })

module.exports = router;