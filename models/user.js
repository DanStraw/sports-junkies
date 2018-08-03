const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  googleId: String,
  email: String,
  bets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bet"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;