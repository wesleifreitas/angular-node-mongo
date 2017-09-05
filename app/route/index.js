var router = require('express').Router();

router.use('/myApp/api', require('./api'));

module.exports = router;