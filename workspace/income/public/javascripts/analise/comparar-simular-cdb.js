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
		// calculandoRendimentosPorProdutos(valorInvestido, tempoInvestindo, taxaIndicador, percentual, IR)
		var retorno = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
														document.getElementById("tempoInvestido").value,
														14.13,
														100,
														true);		
		var chart = new Highcharts.Chart(graphDraw());
		chart.redraw();

		var chart2 = new Highcharts.Chart(graphDraw2());
		chart2.redraw();
		tableDraw(retorno);
				
		// var maxDate=new Date(Math.max.apply(null,retorno.ObjDataPeriodo));
		// var minDate=new Date(Math.min.apply(null,retorno.ObjDataPeriodo));
		// var valorInvestidoTotal = Math.max.apply(null,retorno.ObjValorInvestidoTotal);
		// var montanteTotal = Math.max.apply(null,retorno.ObjMontanteTotal);
		// var rendimentoTotal = Math.max.apply(null,retorno.ObjRendimentoTotal);
		
		// var diffMes = Date.DateDiff('m', minDate,maxDate) + 1;
		// var diferencaAnos = Math.floor(diffMes/12);

		// $('.valueValorInvestidoTotal').text('R$ '+valorMoeda(valorInvestidoTotal, 2, ',', '.'));
		// $('.valueMontanteTotal').text('R$ '+valorMoeda(montanteTotal, 2, ',', '.'));
		// $('.valueRendimentoTotal').text('R$ '+valorMoeda(rendimentoTotal, 2, ',', '.'));
		// if(diffMes >=12){
		// 	$('.valueAnos').text(diferencaAnos+' Anos');
		// }else
		// 	$('.valueAnos').text(' ');
		// if(diffMes-(diferencaAnos*12) != 0){
		// 	$('.valueMeses').text(diffMes-(diferencaAnos*12)+' Meses');
		// }else
		// 	$('.valueMeses').text(' ');
	}

	function tableDraw(retorno) { //REFERENCE https://datatables.net/reference/option/
		var dados = [];		
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			var vet = [];
			vet.push(retorno.ObjPeriodo[i]+'º');
			vet.push(arrayMesMin[retorno.ObjDataPeriodo[i].getMonth()]+" / "+retorno.ObjDataPeriodo[i].getFullYear());
			
			vet.push('R$ '+valorMoeda(retorno.ObjRendimentoAcumulado[i], 2, ',', '.'));
			vet.push('R$ '+valorMoeda(retorno.ObjMontante[i], 2, ',', '.'));
			if (retorno.ObjTaxaIr[i] == 0.225) {
				vet.push('<span class="label label-danger pull-right">'+(100.0*retorno.ObjTaxaIr[i]).toFixed(2)+'% </span>');			
			}else if (retorno.ObjTaxaIr[i] == 0.2){
				vet.push('<span class="label label-warning pull-right">'+(100.0*retorno.ObjTaxaIr[i]).toFixed(2)+'% </span>');			
			}else if (retorno.ObjTaxaIr[i] == 0.175){
				vet.push('<span class="label label-info pull-right">'+(100.0*retorno.ObjTaxaIr[i]).toFixed(2)+'% </span>');			
			}else if (retorno.ObjTaxaIr[i] == 0.15){
				vet.push('<span class="label label-success pull-right">'+(100.0*retorno.ObjTaxaIr[i]).toFixed(2)+'% </span>');			
			}
			vet.push('R$ '+valorMoeda(retorno.ObjValorIr[i], 2, ',', '.'));

			vet.push('R$ '+valorMoeda(retorno.ObjRendimentoAcumuladoIr[i], 2, ',', '.'));
			vet.push('R$ '+valorMoeda(retorno.ObjMontanteIr[i], 2, ',', '.'));

			vet.push(retorno.ObjRentabilidadePercent[i].toFixed(2)+'%');
			if (retorno.ObjTaxaIr[i] == 0.225) {
				vet.push('<span class="label label-danger pull-right">'+(retorno.ObjRentabilidadePercentIr[i]).toFixed(2)+'% </span>');			
			}else if (retorno.ObjTaxaIr[i] == 0.2){
				vet.push('<span class="label label-warning pull-right">'+(retorno.ObjRentabilidadePercentIr[i]).toFixed(2)+'% </span>');			
			}else if (retorno.ObjTaxaIr[i] == 0.175){
				vet.push('<span class="label label-info pull-right">'+(retorno.ObjRentabilidadePercentIr[i]).toFixed(2)+'% </span>');			
			}else if (retorno.ObjTaxaIr[i] == 0.15){
				vet.push('<span class="label label-success pull-right">'+(retorno.ObjRentabilidadePercentIr[i]).toFixed(2)+'% </span>');			
			}
			vet.push(retorno.ObjRentabilidadePercentIr[i].toFixed(2)+'%');			
			
			dados.push(vet);
		}
		// ObjPeriodo
		// ObjDataPeriodo
		// ObjRendimentoAcumulado
		// ObjMontante
		// ObjRentabilidadePercent
		// ObjTaxaIr
		// ObjValorIr
		// ObjRendimentoAcumuladoIr
		// ObjMontanteIr
		// ObjRentabilidadePercentIr
		
		if ( $.fn.dataTable.isDataTable( '#tabelaDados' ) ) {
			var t2 = $('#tabelaDados').DataTable();
			t2.destroy();
			t2 = $('#tabelaDados').DataTable({
					data: dados,
					searching: true,
					paging: true,
					ordering: false,		
					lengthChange: true,
					pageLength: 25,
					lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"] ],
					fixedHeader: true,
					responsive: true,
					tabIndex: 1,
					language: { //https://datatables.net/reference/option/language
						info: 'Visualizando página _PAGE_ de _PAGES_',
						search: 'Filtrar&nbsp;',
						emptyTable: 'Sem dados para visualização',
						lengthMenu: 'Mostrar _MENU_ &nbsp;&nbsp;',
						infoFiltered: '(filtrado de um total de _MAX_ períodos)',
						paginate: {
							first:    'Primeira',
							last:     'Última',
							next:     'Próximo',
							previous: 'Anterior'
						},
					},
					columns: [
						{ title: "Período", width: "3%" },
						{ title: "Mês / Ano", width: "10%" },
						
						{ title: "Rendimento <br/>com IR", width: "10%" },
						{ title: "Montante <br/>com IR", width: "10%" },
						
						{ title: "Faixa IR", width: "5%" },
						{ title: "Valor IR", width: "8%" },
						
						{ title: "Rendimento <br/>sem IR", width: "10%" },
						{ title: "Montante <br/>sem IR", width: "10%" },

						{ title: "Rentabilidade <br/>com IR", width: "10%" },
						{ title: "Rentabilidade <br/>sem IR", width: "10%" }
					],
					dom: '<"html5buttons"B>lTfgitp',
					buttons: [
						{extend: 'copy'},
						{extend: 'csv'},
						{extend: 'excel', title: 'Resumo da simulação de quanto precisaria investir para atingir um rendimento mensal.'},
						{extend: 'pdf', title: 'Resumo da simulação de quanto precisaria investir para atingir um rendimento mensal.'},

						{extend: 'print',
						 customize: function (win){
										$(win.document.body).addClass('white-bg');
										$(win.document.body).css('font-size', '10px');

										$(win.document.body).find('table')
														.addClass('compact')
														.css('font-size', 'inherit');
													}
						}
					]
			});
		}else{
			var tabela = $('#tabelaDados').DataTable({
				data: dados,
				searching: true,
				paging: true,
				ordering: false,		
				lengthChange: true,
				pageLength: 25,
				lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"] ],
				fixedHeader: true,
				responsive: true,
				tabIndex: 1,
				language: { //https://datatables.net/reference/option/language
					info: 'Visualizando página _PAGE_ de _PAGES_',
					search: 'Filtrar&nbsp;',
					emptyTable: 'Sem dados para visualização',
					lengthMenu: 'Mostrar _MENU_ &nbsp;&nbsp;',
					infoFiltered: '(filtrado de um total de _MAX_ períodos)',
					paginate: {
						first:    'Primeira',
						last:     'Última',
						next:     'Próximo',
						previous: 'Anterior'
					},
				},
				columns: [
					{ title: "Período", width: "3%" },
					{ title: "Mês / Ano", width: "10%" },
					
					{ title: "Rendimento <br/>com IR", width: "10%" },
					{ title: "Montante <br/>com IR", width: "10%" },
					
					{ title: "Faixa IR", width: "5%", /*className: 'label-danger'*/},
					{ title: "Valor IR", width: "8%" },
					
					{ title: "Rendimento <br/>sem IR", width: "10%" },
					{ title: "Montante <br/>sem IR", width: "10%" },

					{ title: "Rentabilidade <br/>com IR", width: "10%" },
					{ title: "Rentabilidade <br/>sem IR", width: "10%" }
				],
				dom: '<"html5buttons"B>lTfgitp',
				buttons: [
					{extend: 'copy'},
					{extend: 'csv'},
					{extend: 'excel', title: 'Resumo da simulação de quanto precisaria investir para atingir um rendimento mensal.'},
					{extend: 'pdf', title: 'Resumo da simulação de quanto precisaria investir para atingir um rendimento mensal.'},

					{extend: 'print',
					 customize: function (win){
									$(win.document.body).addClass('white-bg');
									$(win.document.body).css('font-size', '10px');

									$(win.document.body).find('table')
													.addClass('compact')
													.css('font-size', 'inherit');
												}
					}
				]
			});
		}
	}

	function graphDraw(){

		var retorno = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13,
																										100,
																										true);
		var retornoMenos10 = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13 - 14.13*0.1,
																										100,
																										true);
		var retornoMais10 = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13 + 14.13*0.1,
																										100,
																										true);

		var seriesRetorno = [], categoriasX = [];
		seriesRetorno = seriesRetorno.concat({name: 'Montante bruto (variação CDI +10%)', type: 'line',
																					turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,// lineWidth: 5,
																					data: retornoMais10.ObjMontante});

		seriesRetorno = seriesRetorno.concat({name: 'Montante bruto', type: 'line',
																					turboThreshold:10000, marker: {enabled : false},// lineWidth: 5,
																					data: retorno.ObjMontante});

		seriesRetorno = seriesRetorno.concat({name: 'Montante bruto (variação CDI -10%)', type: 'line',
																					turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,// lineWidth: 5,
																					data: retornoMenos10.ObjMontante});
				
		// seriesRetorno = seriesRetorno.concat({name: 'Capital Acumulado',
		// 																turboThreshold:10000, marker: {enabled : false},// dashStyle: 'longdash', lineWidth: 1,
		// 																data: retorno.ObjMontanteTotal});
		// seriesRetorno = seriesRetorno.concat({name: 'Rendimento Acumulado',
		// 																turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,
		// 																data: retorno.ObjRendimentoAcumulado});
		var date1, valor;
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			categoriasX.push(/*""+retorno.ObjPeriodo[i]+"º | "+*/arrayMesMin[retorno.ObjDataPeriodo[i].getMonth()]+"/"+retorno.ObjDataPeriodo[i].getFullYear());
		}

		Highcharts.setOptions({
			lang: {
					thousandsSep: '.',
					decimalPoint: ',',
					loading: "Atualizando...",
					noData: "Sem dados carregados."
			}
		});

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
					fillOpacity: 0.5,
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

	function graphDraw2(){

		var retorno = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13,
																										100,
																										true);
		var retornoMenos10 = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13 - 14.13*0.1,
																										100,
																										true);
		var retornoMais10 = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13 + 14.13*0.1,
																										100,
																										true);

		var seriesRetorno = [], categoriasX = [];
		seriesRetorno = seriesRetorno.concat({name: 'Montante líquido (variação CDI +10%)', type: 'line',
																					turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,// lineWidth: 5,
																					data: retornoMais10.ObjMontanteIr});

		seriesRetorno = seriesRetorno.concat({name: 'Montante líquido', type: 'line',
																					turboThreshold:10000, marker: {enabled : false},// lineWidth: 5,
																					data: retorno.ObjMontanteIr});

		seriesRetorno = seriesRetorno.concat({name: 'Montante líquido (variação CDI -10%)', type: 'line',
																					turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,// lineWidth: 5,
																					data: retornoMenos10.ObjMontanteIr});
				
		// seriesRetorno = seriesRetorno.concat({name: 'Capital Acumulado',
		// 																turboThreshold:10000, marker: {enabled : false},// dashStyle: 'longdash', lineWidth: 1,
		// 																data: retorno.ObjMontanteTotal});
		// seriesRetorno = seriesRetorno.concat({name: 'Rendimento Acumulado',
		// 																turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,
		// 																data: retorno.ObjRendimentoAcumulado});
		var date1, valor;
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			categoriasX.push(/*""+retorno.ObjPeriodo[i]+"º | "+*/arrayMesMin[retorno.ObjDataPeriodo[i].getMonth()]+"/"+retorno.ObjDataPeriodo[i].getFullYear());
		}

		Highcharts.setOptions({
			lang: {
					thousandsSep: '.',
					decimalPoint: ',',
					loading: "Atualizando...",
					noData: "Sem dados carregados."
			}
		});

		var options_graficoLinhaTempoRendimento = {
			chart: {
				renderTo: 'graficoLinhaTempoRendimentoLiquido',
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
					fillOpacity: 0.5,
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

	function graphDraw3(){

		var retorno = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13,
																										100,
																										true);
		var retornoMenos10 = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13 - 14.13*0.1,
																										100,
																										true);
		var retornoMais10 = calculandoRendimentosPorProdutos( document.getElementById("valorInvestido").value,
																										document.getElementById("tempoInvestido").value,
																										14.13 + 14.13*0.1,
																										100,
																										true);

		var seriesRetorno = [], categoriasX = [];
		seriesRetorno = seriesRetorno.concat({name: 'Montante líquido (variação CDI +10%)', type: 'area',
																					turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,// lineWidth: 5,
																					data: retornoMais10.ObjMontanteIr});

		seriesRetorno = seriesRetorno.concat({name: 'Montante líquido', type: 'area',
																					turboThreshold:10000, marker: {enabled : false},// lineWidth: 5,
																					data: retorno.ObjMontanteIr});

		seriesRetorno = seriesRetorno.concat({name: 'Montante líquido (variação CDI -10%)', type: 'area',
																					turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,// lineWidth: 5,
																					data: retornoMenos10.ObjMontanteIr});
				
		// seriesRetorno = seriesRetorno.concat({name: 'Capital Acumulado',
		// 																turboThreshold:10000, marker: {enabled : false},// dashStyle: 'longdash', lineWidth: 1,
		// 																data: retorno.ObjMontanteTotal});
		// seriesRetorno = seriesRetorno.concat({name: 'Rendimento Acumulado',
		// 																turboThreshold:10000, marker: {enabled : false}, dashStyle: 'longdash'/*dot*/, lineWidth: 1,
		// 																data: retorno.ObjRendimentoAcumulado});
		var date1, valor;
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			categoriasX.push(/*""+retorno.ObjPeriodo[i]+"º | "+*/arrayMesMin[retorno.ObjDataPeriodo[i].getMonth()]+"/"+retorno.ObjDataPeriodo[i].getFullYear());
		}

		Highcharts.setOptions({
			lang: {
					thousandsSep: '.',
					decimalPoint: ',',
					loading: "Atualizando...",
					noData: "Sem dados carregados."
			}
		});

		var options_graficoLinhaTempoRendimento = {
			chart: {
				renderTo: 'graficoColunasComparativo',
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
					fillOpacity: 0.5,
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