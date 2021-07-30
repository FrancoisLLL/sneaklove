const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker")
const User = require("../models/User")

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});




module.exports = router;