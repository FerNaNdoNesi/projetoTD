module.exports = function(app){
	var modulo02 = app.controllers.modulo02;

	app.get('/modulo02', modulo02.index);	
	app.get('/modulo02/listar', modulo02.listar);
	app.get('/modulo02/cadastrar', modulo02.cadastrar);
	app.post('/modulo02/postCadastrar', modulo02.postCadastrar);
}