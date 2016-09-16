module.exports = function(app){
	var comparar = app.controllers.comparar;

	app.get('/drag', comparar.drag);
	app.get('/comparar-investimentos', comparar.comparar_investimentos);
}