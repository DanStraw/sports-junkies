const db = require("../models");

module.exports = {
    findAll: function(cb) {
        db.User.find({}).exec(cb)
    },
    create: function(req, res) {
        console.log('controller:', req)
        db.User.collection
            .insert(req)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    findById: function(req, res) {
        db.User
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        console.log(req.params)
        db.User 
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }   
}