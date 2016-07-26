module.exports = function(app){
	var modulo01 = app.controllers.modulo01;

	app.get('/modulo01', modulo01.index);
	app.get('/modulo01/grafico-zoom', modulo01.grafico_zoom);
	app.get('/modulo01/sair', modulo01.sair);
}