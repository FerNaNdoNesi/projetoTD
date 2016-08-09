module.exports = function(app){
	var home = app.controllers.home;

	app.get('/', home.inicio);
	app.get('/sobre', home.sobre);
	app.get('/default', home.default);
	app.get('/testes', home.testes);
}