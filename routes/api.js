var express = require('express');
var router = express.Router();
var cloudant = require('../db/cloudant');

/* GET users listing. */
router.get('/getPlots', function(req, res, next) {
	cloudant.getFilledDustbins(function(error, data){
		if(error){
			res.status(500);
		}
		res.json(data);
	});
});

module.exports = router;
