var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/testing', function(req, res, next) {
  res.render('testing');
});

router.get('/patches', function(req, res, next) {
  res.render('patches');
})

module.exports = router;
