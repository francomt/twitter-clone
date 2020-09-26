const express = require('express');
const router = express.Router();

router.use('/dummy', require('./dummyRoute')); //match requests to /api/dummy/

//handling 404s
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
