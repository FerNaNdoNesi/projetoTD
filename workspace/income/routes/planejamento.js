module.exports = function(app){
	var planejamento = app.controllers.planejamento;

	app.get('/planejamento/renda-mensal', planejamento.renda_mensal);
}