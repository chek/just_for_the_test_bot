var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host');
  res.send(fullUrl);
});

module.exports = router;
