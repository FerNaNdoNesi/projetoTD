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
				}
				res.redirect('/modulo02/listar');
			});
		},
		listar: function(req, res){
			Usuario.find(function(err, data){
				if(err){
					console.log('Erro ao listar: '+err);
				}else{
					console.log('Dados listados com sucesso!!');
					res.render('modulo02/listar', {lista: data});
					// res.json(data);
				}
			});
		}
	}	
	return Modulo02Controller;
}