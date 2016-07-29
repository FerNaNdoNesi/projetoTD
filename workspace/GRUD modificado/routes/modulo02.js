module.exports = function(app){
	var modulo02 = app.controllers.modulo02;

	app.get('/modulo02', modulo02.index);	
	app.get('/modulo02/listar', modulo02.listar);
	app.get('/modulo02/cadastrar', modulo02.cadastrar);
	app.post('/modulo02/postCadastrar', modulo02.postCadastrar);//salvar dados
	app.get('/modulo02/editar/:id', modulo02.editar);//trazer dados
	app.post('/modulo02/atualizar/:id', modulo02.atualizar);//update dados // deveria ser put
	app.get('/modulo02/show/:id', modulo02.show);
	app.post('/modulo02/excluir/:id', modulo02.excluir);
}

// metodos HTTP put, get, post, delete