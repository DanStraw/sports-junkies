const router = require("express").Router();
const userRoutes = require("./users");
const betRoutes = require("./bets");

router.use("/users", userRoutes);

module.exports = router;