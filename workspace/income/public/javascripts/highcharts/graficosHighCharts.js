	$('.container2').highcharts({
		plotOptions: {
			series: {
				point: {
					events: {
						update: function (event) {
							if (!confirm('change?')) {
								return false;
							}
						}
					}
				}
			}
		},
		series: [{
			data: [200, 200, 100, 0.1, 150, 50, 30, 40, 300]
		}]
	});
	// button handler
	$('.button').click(function () {
			var chart = $('.container2').highcharts();
			chart.series[0].data[0].update(150);
			alert("dasssf");
	});

	// button handler
	$('#button').click(function () {
			var chart = $('.graficoTesters').highcharts();
			chart.series[0].data[0].update(150);
	});
	$('.graficoTesters').highcharts({
		plotOptions: {
			series: {
				point: {
					events: {
						update: function (event) {
								// if (!confirm('change?')) {
										// return false;
								// }
								return true;
							// data: [2, 20, 10, 0.01, 10, 50, 30, 40, 30]
						}
					}
				}
			}
		},
		series: [{
				data: [20, 200, 100, 0.1, 150, 50, 30, 40, 300]
		}]
	});

	$('.touchspin1').blur(function(){
		alert('blurJs');
		var chart = $('.container2').highcharts();
		chart.series[0].data[0].update(150);		
	});

	var objRetorno = [];
	objRetorno = objRetorno.concat({name: 'Linha 01', turboThreshold:10000, data: [1,2,3,4,5,6,7]});
	objRetorno = objRetorno.concat({name: 'Linha 02', turboThreshold:10000, data: [2,6,3,4,6,2,3]});
						 
	Highcharts.setOptions({
			lang: {
					thousandsSep: '.',
					decimalPoint: ',',
					loading: "Atualizando...",
					noData: "Sem dados carregados."
			}
	});
	
	$('.graficoLinhaTempoRendimento').highcharts({
			chart: {
					zoomType: 'y'
			},
			title: {
					text: 'Titulo do gráfico'
			},
			subtitle: {
					text: 'Subtitulo do gráfico'
			},
			credits: {
					enabled: false
			},
			xAxis: {
					title: {
							text: 'Meses do ano'
					},
					crosshair: true,
					type: 'trendline'
					// type: 'datetime'
					// categories: retorno.ObjMesAno
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
					headerFormat: '{point.key}<table>',
					pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
											'<td style="text-align: right"><b>R$ {point.y}</b> </td></tr>',
					footerFormat: '</table>',
					valueDecimals: 2,
					shared: true
			},
			legend: {
					layout: 'vertical', //horizontal", "vertical
					align: 'left', //left, center,  right.
					verticalAlign: 'top', //top, middle, bottom
					borderWidth: 0,
					floating: true, //sobreposto
					fontSize: '9px'
			},
			plotOptions: { //#45918b
					series: {
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
					area: {
							fillColor: {
									linearGradient: {
											x1: 0,
											y1: 0,
											x2: 0,
											y2: 1
									},
									stops: [
											[0, Highcharts.getOptions().colors[0]],
											[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
									]
							},
							marker: {
									radius: 5,
									lineWidth: 0.5,
									lineColor: '#ffffff'
							},
							lineWidth: 0.5,
							states: {
									hover: {
											lineWidth: 1
									}
							},
							threshold: null
					}
			},
			// data: [1,5,3,6,7,5,6,9]
			series: objRetorno
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
	});

	$('.graficoLinhaBasico').highcharts({
			title: {
					text: 'Monthly Average Temperature',
					x: -20 //center
			},
			subtitle: {
					text: 'Source: WorldClimate.com',
					x: -20
			},
			xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
							'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis: {
					title: {
							text: 'Temperature (°C)'
					},
					plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
					}]
			},
			tooltip: {
					valueSuffix: '°C'
			},
			legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
			},
			series: [{
					name: 'Tokyo',
					data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
					name: 'New York',
					data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			}, {
					name: 'Berlin',
					data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			}, {
					name: 'London',
					data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}]
	});


	$('#graficoLinhaDuplo').highcharts({
			title: {
					text: 'Monthly Average Temperature',
					x: -20 //center
			},
			subtitle: {
					text: 'Source: WorldClimate.com',
					x: -20
			},
			xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
							'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis: {
					title: {
							text: 'Temperature (°C)'
					},
					plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
					}]
			},
			tooltip: {
					valueSuffix: '°C'
			},
			legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
			},
			series: [{
					name: 'Tokyo',
					data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
					name: 'New York',
					data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			}, {
					name: 'Berlin',
					data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			}, {
					name: 'London',
					data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}]
	});

	$('#tabelaValores').highcharts({
			//alert(' Hello WorldClimate');
	});
// });