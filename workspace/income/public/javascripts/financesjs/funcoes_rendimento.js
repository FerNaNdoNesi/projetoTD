// Find the maximum value in a list of numbers

function formulaAplDepRegBCB(deposito, taxa, periodo) {
  return deposito*(1+taxa)*(((pow(1+taxa,periodo))-1) /taxa);
} //Fórmula rendimento aplicação com depósitos regulares

function formulaAplDepUnicBCB(deposito, taxa, periodo){
  return deposito*pow((1+taxa),periodo);
}//Fórmula rendimento aplicação depósito unico

function calculaRendimentos(capitalInicial, taxa, deposito, rendimentoObj) {
    taxa = (taxa/12)/100;
    var periodo = 0;
    var ObjMontanteDepositos = [],
        ObjMontanteCapital = [],
        ObjMontanteTotal = [],
        ObjRendimentoDepositos = [],
        ObjRendimentoCapital = [],
        ObjRendimentoTotal = [],
        ObjPeriodo = [],
        ObjValorInvestidoDepositos = [],
        ObjValorInvestidoCapital = [],
        ObjValorInvestidoTotal = [];

    do{
      periodo++;
      montanteDepositos = formulaAplDepRegBCB(deposito, taxa, periodo);
      montanteDepositosAnt = formulaAplDepRegBCB(deposito, taxa, periodo-1);
      montanteCapital = formulaAplDepUnicBCB(capitalInicial, taxa, periodo);
      montanteCapitalAnt = formulaAplDepUnicBCB(capitalInicial, taxa, periodo-1);

      rendimentoDepositos = montanteDepositos - montanteDepositosAnt - deposito;
      rendimentoCapital = montanteCapital - montanteCapitalAnt;
      montanteTotal = montanteDepositos + montanteCapital;
      rendimentoTotal = rendimentoDepositos + rendimentoCapital;
      valorInvestidoDepositos = deposito * periodo;
      valorInvestidoCapital = capitalInicial;
      valorInvestidoTotal = capitalInicial + valorInvestidoDepositos;



      ObjMontanteDepositos.push(montanteDepositos);
      ObjMontanteCapital.push(montanteCapital);
      ObjMontanteTotal.push(montanteTotal);
      ObjRendimentoDepositos.push(rendimentoDepositos);
      ObjRendimentoCapital.push(rendimentoCapital);
      ObjRendimentoTotal.push(rendimentoTotal);
      ObjPeriodo.push(periodo);
      ObjValorInvestidoDepositos.push(valorInvestidoDepositos);
      ObjValorInvestidoCapital.push(valorInvestidoCapital);
      ObjValorInvestidoTotal.push(valorInvestidoTotal);


    }while(rendimentoTotal <= rendimentoObj)

    return ({ObjPeriodo: ObjPeriodo, ObjValorInvestidoTotal: ObjValorInvestidoTotal, ObjRendimentoTotal: ObjRendimentoTotal, ObjMontanteTotal: ObjMontanteTotal});
}

retorno = calculaRendimentos(1000, 12, 100, 500);
writeln(retorno);
  for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
    writeln(retorno.ObjPeriodo[i]+" "+retorno.ObjValorInvestidoTotal[i]+
            " "+ retorno.ObjRendimentoTotal[i] +" "+ retorno.ObjMontanteTotal[i]);
  }


/*
FONTE FORMULAS BCB
  https://www3.bcb.gov.br/CALCIDADAO/publico/calcularValorFuturoCapital.do
FORMULA JUROS DEPOSITO
  deposito*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
*/
