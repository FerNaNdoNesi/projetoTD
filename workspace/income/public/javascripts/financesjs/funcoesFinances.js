// var moment = require('moment');
/*
FONTE FORMULAS BCB
	https://www3.bcb.gov.br/CALCIDADAO/publico/calcularValorFuturoCapital.do
FORMULA JUROS DEPOSITO
	depositos*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
FORMULA JUROS CAPITAL 
	VP*(1+taxa)^periodo
*/

//valorMoeda(this.y.toFixed(2), 2, ',', '.');
function valorMoeda(n, c, d, t){ //P: numero a converter | numero de casas decimais | separador decimal | separador milha
	c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}//valorMoeda(valor, 2, ',', '.')

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
			ObjDataPeriodo = [],
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
			ObjUpValor = [],
			ObjPercentObjetivo = [];
	
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
		valorInvestidoTotal = Number(capitalInicial) + Number(valorInvestidoDepositos);
		if(rendimentoObj!= 0)
			percentObjetivo = rendimentoTotal/rendimentoObj;
		else
			percentObjetivo = 0;
		console.log("\n"+rendimentoObj+"/"+rendimentoTotal+"\n obj: "+percentObjetivo);

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
		ObjPercentObjetivo.push(percentObjetivo);
		//Objetos referente ao período			
		dtAtual.setMonth(dtAtual.getMonth()+1);
		ObjDataPeriodo.push(new Date(dtAtual));

	}while(rendimentoTotal <= rendimentoObj)

	return ({ObjPeriodo: ObjPeriodo,
			 ObjDataPeriodo: ObjDataPeriodo,
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
			 ObjUpValor: ObjUpValor,
			 ObjPercentObjetivo: ObjPercentObjetivo
		});
}

// retorno = buscarRendaMensalCalculandoRendimentos(1000, 12, 100, 500);
// // console.log(retorno);
		
// for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
// 	console.log("\n("+retorno.ObjPeriodo[i]+") "+
// 							retorno.ObjDataPeriodo[i].getMonth()+"/"+retorno.ObjDataPeriodo[i].getFullYear()+
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
// 							retorno.ObjUpValor[i].toFixed(2)+" | Percent: "+
// 							(retorno.ObjPercentObjetivo[i]*100).toFixed(2)+" %"
// 						);
// }

function calculandoRendimentosComDepositoNoPeriodo(capitalInicial, taxa, depositos, tempoInvestindo){
	taxa = (taxa/12)/100;
	var periodo = 0;
	var dtAtual = new Date(); // Em js getMonth() Mês 0~11
	
	var ObjPeriodo = [],
			ObjDataPeriodo = [],
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
			ObjTempoInvestindo = [],
			ObjUpValor = [],
			ObjPercentTempoInvestindo = [],
			ObjRendimentoAcumulado = [],
			ObjRentabilidadePercent = [];
	
	for(periodo = 1; periodo <= tempoInvestindo; periodo++){ // enquanto não chegar ao rendimento mensal objetivo
		
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
		valorInvestidoTotal = Number(capitalInicial) + Number(valorInvestidoDepositos);
		rendimentoAcumulado = Number(montanteTotal) - Number(valorInvestidoTotal);
		if (valorInvestidoTotal != 0)
			rentabilidadePercent = (Number(rendimentoAcumulado) / Number(valorInvestidoTotal))*100;
		else
			rentabilidadePercent = 0;
		if(tempoInvestindo!= 0)
			percentTempoInvestindo = periodo/tempoInvestindo;
		else
			percentTempoInvestindo = 0;
		console.log("\n"+tempoInvestindo+"/"+periodo+"\n obj: "+percentTempoInvestindo);

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
		ObjTempoInvestindo.push(tempoInvestindo);
		ObjUpValor.push(upValor);		
		ObjPercentTempoInvestindo.push(percentTempoInvestindo);
		ObjRendimentoAcumulado.push(rendimentoAcumulado);
		ObjRentabilidadePercent.push(rentabilidadePercent);
		//Objetos referente ao período			
		dtAtual.setMonth(dtAtual.getMonth()+1);
		ObjDataPeriodo.push(new Date(dtAtual));

	}

	return ({ObjPeriodo: ObjPeriodo,
			 ObjDataPeriodo: ObjDataPeriodo,
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
			 ObjTempoInvestindo: ObjTempoInvestindo,
			 ObjUpValor: ObjUpValor,
			 ObjPercentTempoInvestindo: ObjPercentTempoInvestindo,
			 ObjRendimentoAcumulado: ObjRendimentoAcumulado,
			 ObjRentabilidadePercent: ObjRentabilidadePercent
		});
}

// retorno = calculandoRendimentosComDepositoNoPeriodo(1000, 12, 100, 12);
// // // console.log(retorno);
		
// for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
// 	console.log("\n("+retorno.ObjPeriodo[i]+") "+
// 							retorno.ObjDataPeriodo[i].getMonth()+"/"+retorno.ObjDataPeriodo[i].getFullYear()+
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
// 							retorno.ObjDepositoMensal[i].toFixed(2)+" | Tempo investindo: "+
// 							retorno.ObjTempoInvestindo[i].toFixed(0)+" | Up: "+
// 							retorno.ObjUpValor[i].toFixed(2)+" | Percent: "+
// 							(retorno.ObjPercentTempoInvestindo[i]*100).toFixed(2)+" %"
// 						);
// }

function buscarAcumularCapitalCalculandoRendimentos(capitalInicial, taxa, depositos, capitalObj){
	taxa = (taxa/12)/100;
	var periodo = 0;
	var dtAtual = new Date(); // Em js getMonth() Mês 0~11
	
	var ObjPeriodo = [],
			ObjDataPeriodo = [],
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
			ObjCapitalObjetivo = [],
			ObjUpValor = [],
			ObjPercentObjetivo = [],
			ObjRendimentoAcumulado = [],
			ObjRentabilidadePercent = [];
	
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
		valorInvestidoTotal = Number(capitalInicial) + Number(valorInvestidoDepositos);
		rendimentoAcumulado = Number(montanteTotal) - Number(valorInvestidoTotal);
		if (valorInvestidoTotal != 0)
			rentabilidadePercent = (Number(rendimentoAcumulado) / Number(valorInvestidoTotal))*100;
		else
			rentabilidadePercent = 0;
		if(capitalObj!= 0)
			percentObjetivo = montanteTotal/capitalObj;
		else
			percentObjetivo = 0;
		console.log("\n"+capitalObj+"/"+montanteTotal+"\n obj: "+percentObjetivo);

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
		ObjCapitalObjetivo.push(capitalObj);
		ObjUpValor.push(upValor);		
		ObjPercentObjetivo.push(percentObjetivo);
		ObjRendimentoAcumulado.push(rendimentoAcumulado);
		ObjRentabilidadePercent.push(rentabilidadePercent);
		//Objetos referente ao período			
		dtAtual.setMonth(dtAtual.getMonth()+1);
		ObjDataPeriodo.push(new Date(dtAtual));

	}while(montanteTotal <= capitalObj)

	return ({ObjPeriodo: ObjPeriodo,
			 ObjDataPeriodo: ObjDataPeriodo,
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
			 ObjCapitalObjetivo: ObjCapitalObjetivo,
			 ObjUpValor: ObjUpValor,
			 ObjPercentObjetivo: ObjPercentObjetivo,
			 ObjRendimentoAcumulado: ObjRendimentoAcumulado,
			 ObjRentabilidadePercent: ObjRentabilidadePercent
		});
}