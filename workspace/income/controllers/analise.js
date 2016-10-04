module.exports = function(app){
	
	var AnaliseController = {
		drag: function(req,res){
			req.flash('analise', true);
			res.render('analise/drag');//, {moment: moment});
		},
		comparar_investimentos: function(req,res){
			req.flash('analise', true);
			res.render('analise/comparar-investimentos');//, {moment: moment});
		},
		comparar_simular_cdb: function(req,res){
			req.flash('analise', true);
			res.render('analise/comparar-simular-cdb');//, {moment: moment});
		}
	}
	return AnaliseController;
}