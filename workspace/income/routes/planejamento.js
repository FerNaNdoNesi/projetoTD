module.exports = function(app){
	var planejamento = app.controllers.planejamento;

	app.get('/rendimento-mensal-independencia-financeira', planejamento.rendimento_mensal_independencia_financeira);
	app.get('/investimento-no-periodo', planejamento.investimento_no_periodo);
	
}