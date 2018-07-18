const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
    username: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    bets: [
        {
          type: Schema.Types.ObjectId,
          ref: "Bet"
        }
      ]
})

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);

module.exports = GoogleUser;