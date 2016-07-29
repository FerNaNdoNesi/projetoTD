var moment = require('moment');

module.exports = function(app){
	
	var Usuario = app.models.modulo02;

	var Modulo02Controller = {
		index:  function(req,res){
			res.render('modulo02/index');
		},
		cadastrar: function(req, res){
			res.render('modulo02/cadastrar');
		},
		postCadastrar: function(req, res){
			var model = new Usuario(req.body); //pega todos os campos do formulário
			model.save(function(err){
				if(err){
					console.log('Erro ao cadastrar: '+err);
				}else{
					req.flash('cadastrado', 'Usuário cadastrado com sucesso!!'); // utilizar req
					res.redirect('/modulo02');
				}
			});
		},
		listar: function(req, res){
			Usuario.find(function(err, data){
				if(err){
					console.log('Erro ao listar: '+err);
				}else{
					console.log('Dados listados com sucesso!!');
					res.render('modulo02/listar', {lista: data, moment: moment});
				}
			});
		},
		editar: function(req, res){
			// Usuario.findOne({_id: req.params.id}, function(err, data){//outra forma
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log('Erro ao editar: '+err);
				}else{
					console.log('Dados editados com sucesso!!');					
					res.render('modulo02/editar', {lista: data});
				}
			});
		},
		atualizar: function(req, res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log('Erro ao atualizar: '+err);
				}else{
					console.log('Dados atualizados com sucesso!!');
					var model   = data;
					model.nome  = req.body.nome;
					model.login = req.body.login;
					model.save(function(err){
						if(err){
							console.log('Erro ao atualizar model: '+err);
						}else{
							req.flash('atualizado', 'Usuário atualizado com sucesso!!'); // utilizar req
							res.redirect('/modulo02'); // rederizar precisa passar o "data"
						}
					});
				}
			});
		},
		show: function(req, res){
			// Usuario.findOne({_id: req.params.id}, function(err, data){//outra forma
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log('Erro ao editar: '+err);
				}else{
					console.log('Dados editados com sucesso!!');
					res.render('modulo02/show', {lista: data});
				}
			});
		},
		excluir: function(req, res){
			Usuario.remove({_id: req.params.id}, function(err){
				if(err){
					console.log("Erro ao excluir: "+ err)
				}else{
					req.flash('excluido', 'Usuário excluido com sucesso!!'); // utilizar req
					res.redirect('/modulo02');
				}
			});
		}
	}	
	return Modulo02Controller;
}