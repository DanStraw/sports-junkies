const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    bets: [
        {
          type: Schema.Types.ObjectId,
          ref: "Bet"
        }
      ]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;