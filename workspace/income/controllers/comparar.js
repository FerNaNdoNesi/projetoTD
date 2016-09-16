module.exports = function(app){
	
	var CompararController = {
		drag: function(req,res){
			req.flash('comparar', true);
			res.render('comparar/drag');//, {moment: moment});
		},
		comparar_investimentos: function(req,res){
			req.flash('comparar', true);
			res.render('comparar/comparar-investimentos');//, {moment: moment});
		}
	}
	return CompararController;
}