module.exports = function(app){
	
	var HomeController = {
		inicio: function(req,res){
			req.flash('inicio', true);
			res.render('home/inicio');
		},
		sobre: function(req,res){
			req.flash('sobre', true);
			res.render('home/sobre');
		},
		default:  function(req,res){
			res.render('home/default');
		},
		testes:  function(req,res){
			res.render('home/testes');
		}
	}
	return HomeController;
}