var Cloudant = require('cloudant');
var _cloudant = {};


function loadCloudant(callback){
	var me = 'a9raag';
	var password = 'heisenbug';
	//var cloudant = Cloudant({account:me, password:password});
	Cloudant({account:me, password:password}, function(err, cloudant) {
		if (err) {
			console.log('Failed to initialize Cloudant: ' + err.message);
			callback(err,{'error':'Authentication Failed'});
			return;
		}
		var params = {
			'selector': {'_id': { '$gt':null },'threshold':{'$gt':0}},
			'fields':['name','lat','lng','threshold'],
		  	'sort': [{'_id': 'asc'}]
		}
		var db = cloudant.db.use('dustbin');
		db.find(params, function(er, result) {
		  	if (er) {
				//throw er;
				console.log(er);
			}
			callback(er,result);					
		});
	});
}

_cloudant.getFilledDustbins = loadCloudant

module.exports = _cloudant;
