const db = require("../models");

module.exports = {
    findAll: function(cb) {
        db.User.find({}).exec(cb)
    },
    create: function(req, res) {
        db.User
            .create(req)
            .then(dbModel =>res.json(dbModel))
            .catch(err=>res.status(500).json(err))
    },
    findById: function(req,cb) {
        console.log('req:', req.params.id)
        db.User
          .findById(req.params.id)
          .populate('bets')
          .exec(cb)
        //   .then((dbUser, res)=> {
        //       console.log('success: ' + dbUser)
        //       console.log(res)
        //       console.log('------------------')
        //       res.json(dbUser)
        //     })
        //   .catch(err => {
        //       console.log(err)
        //     //   res.status(422).json(err)
        //     });
    },
    remove: function(req, res) {
        db.User 
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }   
}