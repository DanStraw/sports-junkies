const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sports-junkies")

const userSeed = [
    {
      username: "danstraw",
      password: "abc123",
      email: "danstraw86@gmai.com",
      date: new Date(Date.now()),
      bets: []
    },
    {
        username: "vuvo",
        password: 'xyz456',
        email: "vVo@gmail.com",
        date: new Date(Date.now()),
        bets: []
    },
    {
        username: 'andreC',
        password: 'lmn789',
        email: "andrec@gmail.com",
        date: new Date(Date.now()),
        bets: []
    }
]

const betSeed = [
  {
    typeOfBet: 'moneyLine',
    team1: 'San Francisco',
    team2: 'Pittsburgh',
    team1Line:  '+109',
    team2Line: '-119',
    key: '5-12-18SanFranciscovsPittsburgh',   
    date: '5-12-18'
  }
]


// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.insertedCount + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

  db.Bet
    .remove({})
    .then(() => db.Bet.collection.insertMany(betSeed))
    .then(data => {
      console.log(data.insertedCount + " records inserted!") 
      process.exit(0);
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })