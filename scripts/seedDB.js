const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sports-junkies")

const userSeed = [
    {
      username: "danstraw",
      password: "abc123",
      email: "danstraw86@gmai.com",
      date: new Date(Date.now())
    },
    {
        username: "vuvo",
        password: 'xyz456',
        email: "vVo@gmail.com",
        date: new Date(Date.now())
    },
    {
        username: 'andreC',
        password: 'lmn789',
        email: "andrec@gmail.com",
        date: new Date(Date.now())
    }
]



db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.insertedCount + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });