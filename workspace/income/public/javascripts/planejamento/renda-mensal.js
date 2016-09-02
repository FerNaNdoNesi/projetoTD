	var arrayDia = new Array(7);
			arrayDia[0] = "Domingo";
			arrayDia[1] = "Segunda";
			arrayDia[2] = "Terça";
			arrayDia[3] = "Quarta";
			arrayDia[4] = "Quinta";
			arrayDia[5] = "Sexta";
			arrayDia[6] = "Sábado";
 
	var arrayMesDesc = new Array(12);
			arrayMesDesc[0] = "Janeiro";
			arrayMesDesc[1] = "Fevereiro";
			arrayMesDesc[2] = "Março";
			arrayMesDesc[3] = "Abril";
			arrayMesDesc[4] = "Maio";
			arrayMesDesc[5] = "Junho";
			arrayMesDesc[6] = "Julho";
			arrayMesDesc[7] = "Agosto";
			arrayMesDesc[8] = "Setembro";
			arrayMesDesc[9] = "Outubro";
			arrayMesDesc[10] = "Novembro";
			arrayMesDesc[11] = "Dezembro";

	var arrayMesMin = new Array(12);
			arrayMesMin[0] = "Jan";
			arrayMesMin[1] = "Fev";
			arrayMesMin[2] = "Mar";
			arrayMesMin[3] = "Abr";
			arrayMesMin[4] = "Mai";
			arrayMesMin[5] = "Jun";
			arrayMesMin[6] = "Jul";
			arrayMesMin[7] = "Ago";
			arrayMesMin[8] = "Set";
			arrayMesMin[9] = "Out";
			arrayMesMin[10] = "Nov";
			arrayMesMin[11] = "Dez";

	function atualizaResultado(){
		var retorno = buscarRendaMensalCalculandoRendimentos( document.getElementById("investimentoInicial").value,
															  document.getElementById("taxaJuros").value,
															  document.getElementById("investimentoMensal").value,
															  document.getElementById("rendimentoObjetivo").value);		
		var chart = new Highcharts.Chart(get_options());
		chart.redraw();
		var maxDate=new Date(Math.max.apply(null,retorno.ObjDataPeriodo));
		var minDate=new Date(Math.min.apply(null,retorno.ObjDataPeriodo));
		var valorInvestidoTotal = Math.max.apply(null,retorno.ObjValorInvestidoTotal);
		var montanteTotal = Math.max.apply(null,retorno.ObjMontanteTotal);
		var rendimentoTotal = Math.max.apply(null,retorno.ObjRendimentoTotal);
		
		var diffMes = Date.DateDiff('m', minDate,maxDate);
		var diferencaAnos = Math.floor(diffMes/12);

		$('.valueValorInvestidoTotal').text('R$ '+valorMoeda(valorInvestidoTotal, 2, ',', '.'));
		$('.valueMontanteTotal').text('R$ '+valorMoeda(montanteTotal, 2, ',', '.'));
		$('.valueRendimentoTotal').text('R$ '+valorMoeda(rendimentoTotal, 2, ',', '.'));
		if(diffMes >=12){
			$('.valueAnos').text(diferencaAnos+' Anos');
		}else
			$('.valueAnos').text(' ');
		if(diffMes-(diferencaAnos*12) != 0){
			$('.valueMeses').text(diffMes-(diferencaAnos*12)+' Meses');
		}else
			$('.valueMeses').text(' ');

		tableCreate(retorno);
	}

	function tableCreate(retorno) {
		var view = 0;
		var column = 2
		var body = document.getElementsByTagName('tabelaFinal')[0];
		var tbl = document.createElement('p');
		var tbl = document.createElement('table');
		tbl.style.width = '100%';
		tbl.setAttribute('border', '1');
		var tbdy = document.createElement('tbody');
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < column; j++) {
				// if (i == 2 && j == 1) {
				// 	break
				// } else {
				var td = document.createElement('td');
				switch(j) {
					case 0: view = retorno.ObjPeriodo[i]; break;
					case 1: view = retorno.ObjDataPeriodo[i].getMonth()+"/"+retorno.ObjDataPeriodo[i].getFullYear(); break;
					// default:
					// 	default code block
				}
				td.appendChild(document.createTextNode(view));
				i == 1999 && j == 199 ? td.setAttribute('rowSpan', '2') : null;
					tr.appendChild(td);
				// }
			}
			tbdy.appendChild(tr);
		}
		tbl.appendChild(tbdy);
		body.appendChild(tbl);
	}

	function get_options(){

		var retorno = buscarRendaMensalCalculandoRendimentos(Number(document.getElementById("investimentoInicial").value),
																												 Number(document.getElementById("taxaJuros").value),
																												 Number(document.getElementById("investimentoMensal").value),
																												 Number(document.getElementById("rendimentoObjetivo").value));
		var seriesRetorno = [], categoriasX = [];
		seriesRetorno = seriesRetorno.concat({name: 'Rendimento Mensal',
																		turboThreshold:10000, marker: {enabled : false},// lineWidth: 5,
																		data: retorno.ObjRendimentoTotal});
		seriesRetorno = seriesRetorno.concat({name: 'Depósito Mensal',
																		turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash', lineWidth: 1,
																		data: retorno.ObjDepositoMensal});
		seriesRetorno = seriesRetorno.concat({name: 'Rendimento Objetivo',
																		turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,
																		data: retorno.ObjRendimentoObjetivo});
		var date1, valor;
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			categoriasX.push(arrayMesMin[retorno.ObjDataPeriodo[i].getMonth()]+"/"+retorno.ObjDataPeriodo[i].getFullYear());
		}

		Highcharts.setOptions({
			lang: {
					thousandsSep: '.',
					decimalPoint: ',',
					loading: "Atualizando...",
					noData: "Sem dados carregados."
			}
		});

		// $('.graficoLinhaTempoRendimento').highcharts({
		var options_graficoLinhaTempoRendimento = {
			chart: {
				renderTo: 'graficoLinhaTempoRendimento',
				zoomType: 'x'
			},
			title: false,
			// title: {
			// 		// text: 'Titulo novo do gráfico'
			// 		text: retorno.ObjMontanteCapital[5].toFixed(2)
			// },
			// subtitle: {
			// 	text: 'Subtitulo do gráfico'
			// },
			credits: {
				enabled: false
			},
			xAxis: {
				title: {
						text: 'Meses do ano'
				},
				crosshair: true,
				// type: 'trendline'
				// type: 'datetime'
				categories: categoriasX
				// minPadding: 0.05,
				// maxPadding: 100000.05
			},
			yAxis: {
				title: {
						text: 'Valores em R$'
				}
			},
			tooltip: {            
				borderWidth: 2,
				style: {
						fontSize: '9px'
				},
				
				useHTML: true,
				headerFormat: '<b>Período: {point.key}</b><table>',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
										'<td style="text-align: right"><b>R$ {point.y}</b> </td></tr>',
				footerFormat: '</table>',
				valueDecimals: 2,
				shared: true
			},
			legend: {
				layout: 'horizontal', //horizontal", "vertical
				align: 'left', //left, center,  right.
				verticalAlign: 'top', //top, middle, bottom
				borderWidth: 0,
				floating: false, //sobreposto
				fontSize: '9px'
			},
			plotOptions: { //#45918b
				series: {
					allowPointSelect: true,
					point: {
						events: {
							update: function (event) {
								if (!confirm('change?')) {
									return false;
								}
							}
						}
					}
				},
				line: {
					dataLabels: {
						enabled: false
					}
				}				
			},
			// data: [1,5,3,6,7,5,6,9]
			series: seriesRetorno
			// series: [{
					// type: 'line',
					// name: 'R$',
					// data: r_01,
					// visible: true,
					// turboThreshold:5000//set it to a larger threshold, it is by default to 1000
			// }]
			
			// series: [{
			//     name: 'Tokyo',
			//     data: retorno.ObjMontanteTotal //[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			// },{
			//     name: 'New York',
			//     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			// }]
		}
		return options_graficoLinhaTempoRendimento;
	}