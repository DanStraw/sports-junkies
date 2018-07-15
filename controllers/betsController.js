const db = require("../models");

module.exports = {
    findAll: function(cb) {
        console.log('cb:', cb)
        db.Bet.find({}).exec(cb)
    },
    create: function(req, res) {
        db.Bet
        // .find({_name: req.body.name}, function(err, result) {
        //     if (err) {
        //         console.log(err)
        //     }
        //     if (!result) {
        //         db.Bet
        //             .create(req)
        //             .then(dbBet => {
        //                 return db.User.findOneAndUpdate({_id: req.body.userID }, { $push: { bets: dbBet._id } }, { new: true });
        //               })
        //             .then(dbModel =>res.json(dbModel))
        //             .catch(err=>res.status(500).json(err))
        //     }
        // })
            .create(req)
            .then(function(dbBet) {
                return db.User.findOneAndUpdate({_id: "5b4a46dc247d765f6c0e3a57"}, { $push: { bets: dbBet._id } }, { new: true });
            })
            .then(dbBet =>{
                console.log(dbBet)
            })
            .catch(err=>console.log(err))
    },
    findById: function(req, res) {
        db.Bet
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Bet 
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }   
}