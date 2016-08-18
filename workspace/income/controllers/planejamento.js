var moment = require('moment');

module.exports = function(app){
	
	var PlanejamentoController = {
		renda_mensal:  function(req,res){
			req.flash('planejamento', true);
			res.render('planejamento/renda-mensal', {moment: moment});
		}
	}
	return PlanejamentoController;
}