module.exports = function(app){
  
  var Modulo01Controller = {
    index:  function(req,res){
      res.render('modulo01/index');
    },
    sair:  function(req,res){
      res.render('modulo01/sair');
    },
    grafico_zoom:  function(req,res){
      var value = 'Grafico do Fernando';
      // value.titulo = 'Grafico do Fernando';
      res.render('modulo01/grafico-zoom', {lista: value});
      // res.render('modulo01/grafico-zoom');
    }
  }
  return Modulo01Controller;
}