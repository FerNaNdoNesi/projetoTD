/*
FONTE FORMULAS BCB
	https://www3.bcb.gov.br/CALCIDADAO/publico/calcularValorFuturoCapital.do
FORMULA JUROS DEPOSITO
	depositos*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
FORMULA JUROS CAPITAL 
	VP*(1+taxa)^periodo
*/

function formulaAplDepRegBCB(depositos, taxa, periodo){
	return depositos*(1+taxa)*(((Math.pow(1+taxa,periodo))-1)/taxa);
	// FONTE FORMULAS BCB
	// depositos*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
	// https://www3.bcb.gov.br/CALCIDADAO/publico/calcularValorFuturoCapital.do
	// Fórmula rendimento aplicação com depósitos regulares
}

function formulaAplDepUnicBCB(capital, taxa, periodo){
	return capital*Math.pow((1+taxa),periodo);
	// FORMULA JUROS CAPITAL 
	// VP*(1+taxa)^periodo
	// Fórmula rendimento aplicação depósito unico
}

function buscarRendaMensalCalculandoRendimentos(capitalInicial, taxa, depositos, rendimentoObj){
	taxa = (taxa/12)/100;
	var periodo = 0;
	var dtAtual = new Date(); // Em js getMonth() Mês 0~11
	
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

	do{ // enquanto não chegar ao rendimento mensal objetivo
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

		//Objetos referente aos valores
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
		//Objetos referente ao período			
		dtAtual.setMonth(dtAtual.getMonth()+1);		
		ObjdataPeriodo.push(dtAtual.getTime());
		ObjMesAno.push(dtAtual.getMonth()+"/"+dtAtual.getFullYear());

	}while(rendimentoTotal <= rendimentoObj)

	return ({ObjPeriodo: ObjPeriodo,
					ObjdataPeriodo: ObjdataPeriodo,
					ObjMesAno: ObjMesAno,
					//Valores Referente ao Capital
					ObjValorInvestidoCapital: ObjValorInvestidoCapital,
					ObjRendimentoCapital: ObjRendimentoCapital,
					ObjMontanteCapital: ObjMontanteCapital,
					//Valores Referente aos Depósitos
					ObjValorInvestidoDepositos: ObjValorInvestidoDepositos,
					ObjRendimentoDepositos: ObjRendimentoDepositos,
					ObjMontanteDepositos: ObjMontanteDepositos,
					//Valores Referente ao Total
					ObjValorInvestidoTotal: ObjValorInvestidoTotal,
					ObjRendimentoTotal: ObjRendimentoTotal,
					ObjMontanteTotal: ObjMontanteTotal,
					//Valores Referente ao Parametros
					ObjDepositoMensal: ObjDepositoMensal,
					ObjRendimentoObjetivo: ObjRendimentoObjetivo,
					ObjUpValor: ObjUpValor
				});
}

// retorno = buscarRendaMensalCalculandoRendimentos(1000, 12, 100, 500);
// //console.log(retorno);
		
// for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
// 	console.log("\n("+retorno.ObjPeriodo[i]+") "+retorno.ObjMesAno[i]+
// 							"\n\t\t Capital \tDepositos \t Total\n Investimento \t"+
// 							retorno.ObjValorInvestidoCapital[i].toFixed(2)+" \t"+
// 							retorno.ObjValorInvestidoDepositos[i].toFixed(2)+" \t"+
// 							retorno.ObjValorInvestidoTotal[i].toFixed(2)+"\n Rendimento \t"+
							
// 							retorno.ObjRendimentoCapital[i].toFixed(2)+" \t \t"+
// 							retorno.ObjRendimentoDepositos[i].toFixed(2)+" \t \t"+
// 							retorno.ObjRendimentoTotal[i].toFixed(2)+"\n Montante \t"+
							
// 							retorno.ObjMontanteCapital[i].toFixed(2)+"\t \t"+
// 							retorno.ObjMontanteDepositos[i].toFixed(2)+"\t"+
// 							retorno.ObjMontanteTotal[i].toFixed(2)+"\n\n Depósito: "+
// 							retorno.ObjDepositoMensal[i].toFixed(2)+" | Objetivo: "+
// 							retorno.ObjRendimentoObjetivo[i].toFixed(2)+" | Up: "+
// 							retorno.ObjUpValor[i].toFixed(2)
// 						);
// }
