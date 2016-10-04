module.exports = function(app){
	var analise = app.controllers.analise;

	app.get('/drag', analise.drag);
	app.get('/comparar-investimentos', analise.comparar_investimentos);
	app.get('/comparar-simular-cdb', analise.comparar_simular_cdb);
}