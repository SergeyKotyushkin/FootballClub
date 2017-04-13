var express = require('express');
var path = require('path');
var router = express.Router();

router.use(function(req, res, next) {

  next();
})

router.get('*', function(req, res, next) {
    res.sendFile(path.resolve(path.join('client', 'index.html')));
});


module.exports = router;
