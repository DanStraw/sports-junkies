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
        console.log(req)
        db.User
          .findById(req)
          .populate('bets')
          .exec(cb)
    },
    remove: function(req, res) {
        db.User 
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }   
}