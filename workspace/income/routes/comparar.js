module.exports = function(app){
	var comparar = app.controllers.comparar;

	app.get('/drag', comparar.drag);
}