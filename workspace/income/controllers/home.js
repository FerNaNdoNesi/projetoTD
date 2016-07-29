module.exports = function(app){
	
	var HomeController = {
		index:  function(req,res){
			res.render('home/index');
		},
		inicio: function(req,res){
			res.render('home/inicio');
		}
	}
	return HomeController;
}