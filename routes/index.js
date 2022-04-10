var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Welcome to Emall Saint Web you will be redirect to the home page");
});

module.exports = router;
