module.exports = function(app){
	
	var TesouroController = {
		titulos_tesouro_direto:  function(req,res){
			req.flash('tesouro', true);
			res.render('tesouro/titulos-tesouro-direto');//, {moment: moment});
		}
	}
	return TesouroController;
}