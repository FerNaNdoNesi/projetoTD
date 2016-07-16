module.exports = function(app){
	
	var Modulo01Controller = {
		index:  function(req,res){
			res.render('modulo01/index');
		},
		sair:  function(req,res){
			res.render('modulo01/sair');
		}
	}
	return Modulo01Controller;
}