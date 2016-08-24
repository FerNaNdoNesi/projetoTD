module.exports = function(app){
	var planejamento = app.controllers.planejamento;

	app.get('/renda-mensal', planejamento.renda_mensal);
}