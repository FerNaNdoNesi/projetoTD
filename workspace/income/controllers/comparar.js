module.exports = function(app){
	
	var CompararController = {
		drag:  function(req,res){
			req.flash('comparar', true);
			res.render('comparar/drag');//, {moment: moment});
		}
	}
	return CompararController;
}