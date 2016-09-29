const express = require('express');
const router = express.Router();

const debug = require('debug')('blackboard');


/* GET blackboard. */
router.get('/', function(req, res, next) {
  debug(req.db.JSON());
  req.app.io.on('connection', function(socket){
    debug('a user connected');
  });
  res.render('blackboard', {questions: req.db.JSON()});
});


/* GET blackboard form*/
router.get('/ask', function(req, res, next) {
  res.render('blackboard-form');
});

module.exports = router;
