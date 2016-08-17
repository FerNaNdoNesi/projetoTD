$(function () {

    var barData = {
        labels: ["Poupança", "CDB 90%", "LCI 80%", "CDB 100%", "LCI 90%", "TD Selic", "CDB 116%"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        responsive: true
    }


    var ctx = document.getElementById("barChart").getContext("2d");
    var myNewChart = new Chart(ctx).Bar(barData, barOptions);
});

/*
FONTE FORMULAS BCB
  https://www3.bcb.gov.br/CALCIDADAO/publico/calcularValorFuturoCapital.do
FORMULA JUROS DEPOSITO
  depositos*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
FORMULA JUROS CAPITAL 
  VP*(1+taxa)^periodo
*/

function formulaAplDepRegBCB(depositos, taxa, periodo) {
    // depositos*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
  return depositos*(1+taxa)*(((Math.pow(1+taxa,periodo))-1)/taxa);
} //Fórmula rendimento aplicação com depósitos regulares

function formulaAplDepUnicBCB(capital, taxa, periodo){
    // VP*(1+taxa)^periodo
  return capital*Math.pow((1+taxa),periodo);
}//Fórmula rendimento aplicação depósito unico

function calculaRendimentos(capitalInicial, taxa, depositos, rendimentoObj) {
    taxa = (taxa/12)/100;
    var periodo = 0;
    var dtAtual = new Date(); // Em js Mês 0~11
    
    var ObjPeriodo = [],
            ObjdataPeriodo = [],
            ObjMesAno = [],
            ObjValorInvestidoDepositos = [],
        ObjValorInvestidoCapital = [],
        ObjValorInvestidoTotal = [],
        ObjRendimentoDepositos = [],
        ObjRendimentoCapital = [],
        ObjRendimentoTotal = [],
        ObjMontanteDepositos = [],
        ObjMontanteCapital = [],
        ObjMontanteTotal = [],
        ObjDepositoMensal = [],
        ObjRendimentoObjetivo = [],
        ObjUpValor = [];
        

    do{
      periodo++;
      montanteDepositos = formulaAplDepRegBCB(depositos, taxa, periodo);
      montanteDepositosAnt = formulaAplDepRegBCB(depositos, taxa, periodo-1);
      montanteCapital = formulaAplDepUnicBCB(capitalInicial, taxa, periodo);
      montanteCapitalAnt = formulaAplDepUnicBCB(capitalInicial, taxa, periodo-1);

      rendimentoDepositos = montanteDepositos - montanteDepositosAnt - depositos;
      rendimentoCapital = montanteCapital - montanteCapitalAnt;
      montanteTotal = montanteDepositos + montanteCapital;
      montanteTotalAnt = montanteDepositosAnt + montanteCapitalAnt;
      upValor = montanteTotal - montanteTotalAnt;
      rendimentoTotal = rendimentoDepositos + rendimentoCapital;
      valorInvestidoDepositos = depositos * periodo;
      valorInvestidoCapital = capitalInicial;
      valorInvestidoTotal = capitalInicial + valorInvestidoDepositos;

            ObjPeriodo.push(periodo);
            
            ObjValorInvestidoDepositos.push(valorInvestidoDepositos);
      ObjValorInvestidoCapital.push(valorInvestidoCapital);
      ObjValorInvestidoTotal.push(valorInvestidoTotal);
      ObjRendimentoDepositos.push(rendimentoDepositos);
      ObjRendimentoCapital.push(rendimentoCapital);
      ObjRendimentoTotal.push(rendimentoTotal);
      ObjMontanteDepositos.push(montanteDepositos);
      ObjMontanteCapital.push(montanteCapital);
      ObjMontanteTotal.push(montanteTotal);
      ObjDepositoMensal.push(depositos);
      ObjRendimentoObjetivo.push(rendimentoObj);
      ObjUpValor.push(upValor);

            
            dtAtual.setMonth(dtAtual.getMonth()+1);
            
            ObjdataPeriodo.push(dtAtual.getTime());
            ObjMesAno.push(dtAtual.getMonth()+"/"+dtAtual.getFullYear());
    }while(rendimentoTotal <= rendimentoObj)

        // console.log(dtAtual);
    return ({ObjPeriodo: ObjPeriodo,
                     ObjdataPeriodo: ObjdataPeriodo,
                     ObjMesAno: ObjMesAno,
                         ObjValorInvestidoTotal: ObjValorInvestidoTotal,
                         ObjRendimentoTotal: ObjRendimentoTotal,
                         ObjMontanteTotal: ObjMontanteTotal,
        
                     ObjValorInvestidoCapital: ObjValorInvestidoCapital,
                         ObjRendimentoCapital: ObjRendimentoCapital,
                         ObjMontanteCapital: ObjMontanteCapital,
                         
                         ObjValorInvestidoDepositos: ObjValorInvestidoDepositos,
                         ObjRendimentoDepositos: ObjRendimentoDepositos,
                         ObjMontanteDepositos: ObjMontanteDepositos,
                         
                         ObjDepositoMensal: ObjDepositoMensal,
                 ObjRendimentoObjetivo: ObjRendimentoObjetivo,
                 ObjUpValor: ObjUpValor
    });
}

retorno = calculaRendimentos(1000, 12, 100, 500);
 //console.log(retorno);
    
  for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
    console.log("\n("+retorno.ObjPeriodo[i]+") "+retorno.ObjMesAno[i]+
                            "\n\t\t Capital \tDepositos \t Total\n Investimento \t"+
                          retorno.ObjValorInvestidoCapital[i].toFixed(2)+" \t"+
                          retorno.ObjValorInvestidoDepositos[i].toFixed(2)+" \t"+
                          retorno.ObjValorInvestidoTotal[i].toFixed(2)+"\n Rendimento \t"+
                          
                          retorno.ObjRendimentoCapital[i].toFixed(2)+" \t \t"+
                          retorno.ObjRendimentoDepositos[i].toFixed(2)+" \t \t"+
                          retorno.ObjRendimentoTotal[i].toFixed(2)+"\n Montante \t"+
                          
                          retorno.ObjMontanteCapital[i].toFixed(2)+"\t \t"+
                          retorno.ObjMontanteDepositos[i].toFixed(2)+"\t"+
                          retorno.ObjMontanteTotal[i].toFixed(2)+"\n\n Depósito: "+
                          retorno.ObjDepositoMensal[i].toFixed(2)+" | Objetivo: "+
                          retorno.ObjRendimentoObjetivo[i].toFixed(2)+" | Up: "+
                          retorno.ObjUpValor[i].toFixed(2)
                          );
  }
