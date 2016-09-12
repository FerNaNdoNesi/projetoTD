module.exports = function(app){
	
	var PlanejamentoController = {
		rendimento_mensal_independencia_financeira:  function(req,res){
			req.flash('planejamento', true);
			res.render('planejamento/rendimento-mensal-independencia-financeira');//, {moment: moment});
		},
		investimento_no_periodo:  function(req,res){
			req.flash('planejamento', true);
			res.render('planejamento/investimento-no-periodo');
		}
	}
	return PlanejamentoController;
}