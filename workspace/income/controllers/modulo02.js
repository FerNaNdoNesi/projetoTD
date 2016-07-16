module.exports = function(app){
	
	var Modulo02Controller = {
		index:  function(req,res){
			res.render('modulo02/index');
		}
	}
	return Modulo02Controller;
}