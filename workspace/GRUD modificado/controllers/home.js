module.exports = function(app){
	
	var HomeController = {		
		inicio:  function(req,res){
			res.render('home/inicio');
		}
	}
	return HomeController;
}