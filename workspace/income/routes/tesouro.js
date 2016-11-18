module.exports = function(app){
	var tesouro = app.controllers.tesouro;

	app.get('/titulos-tesouro-direto', tesouro.titulos_tesouro_direto);
}