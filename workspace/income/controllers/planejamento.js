module.exports = function(app){
	
	var PlanejamentoController = {
		renda_mensal:  function(req,res){
			req.flash('planejamento', true);
			res.render('planejamento/renda-mensal');
		}
	}
	return PlanejamentoController;
}