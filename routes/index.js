var express = require('express');
var telegram = require("../telegram.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //telegram.init();
  var fullUrl = req.protocol + '://' + req.get('host');
  //telegram.startWebhook(fullUrl)

  
  //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index', { title: fullUrl });
  //
});

module.exports = router;
