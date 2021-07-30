const express = require("express");
const router = new express.Router();

//////Sign In Sign up
router.get("/signup", (req, res) => {
    res.render("signup")
    console.log(req.query);
  });
  
  router.get("/signin", (req, res) => {
    res.render("signin")
    console.log(req.query);
  });
  
  router.post("/signup", (req, res) => {
    res.send(req.body)
  });
  
  router.post("/signin", (req, res) => {
    console.log(req.body);
    res.send(req.body)
  });
  
module.exports = router;
