module.exports = function(app){
	var modulo02 = app.controllers.modulo02;

	app.get('/modulo02', modulo02.index);
}