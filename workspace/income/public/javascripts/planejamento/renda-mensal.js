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

	var dataSet = [[ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
			[ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
			[ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
			[ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
			[ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
			[ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
			[ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
			[ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
			[ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
			[ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
			[ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
			[ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
			[ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
			[ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
			[ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
			[ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
			[ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
			[ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
			[ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
			[ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
			[ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
			[ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
			[ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
			[ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
			[ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
			[ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
			[ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
			[ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
			[ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
			[ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
			[ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
			[ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
			[ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
			[ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
			[ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
			[ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]];

	function atualizaResultado(){
		var retorno = buscarRendaMensalCalculandoRendimentos( document.getElementById("investimentoInicial").value,
																document.getElementById("taxaJuros").value,
																document.getElementById("investimentoMensal").value,
																document.getElementById("rendimentoObjetivo").value);		
		var chart = new Highcharts.Chart(get_options());
		chart.redraw();
		tableCreate(retorno);
		var dados = [];
		
		for (var i = 0; i < 6; i++) {
			var vet = [];
			vet.push(retorno.ObjPeriodo[i]);
			vet.push(retorno.ObjValorInvestidoTotal[i]);
			vet.push(retorno.ObjPeriodo[i]);
			vet.push(retorno.ObjPeriodo[i]);
			vet.push(retorno.ObjPeriodo[i]);
			vet.push(retorno.ObjPeriodo[i]);
			dados.push(vet);
		}
		
		// var tabela = $('#tabelaDados').DataTable({
		// 	data: dados, //retorno.ObjPeriodo[5],
		// 	columns: [
		// 			{ title: "Name" },
		// 			{ title: "Position" },
		// 			{ title: "Office" },
		// 			{ title: "Extn." },
		// 			{ title: "Start date" },
		// 			{ title: "Salary" }
		// 	]
		// });
		var tabela = $('#tabelaDados').DataTable({data: dados, searching: false, columns: [
					{ title: "Name" },
					{ title: "Position" },
					{ title: "Office" },
					{ title: "Extn." },
					{ title: "Start date" },
					{ title: "Salary" }
			]});
		https://datatables.net/reference/api/rows().every()
		// tabela.rows().every( function ( rowIdx, tableLoop, rowLoop ){
		// 	var d = this.data();
		// 	d.counter++; // update data source for the row
		// 	this.invalidate(); // invalidate the data DataTables has cached for this row
		// });

		tabela.draw();

		// var table = $('#tabelaDados').DataTable();

		// table.rows().every( function (rowIdx, tableLoop, rowLoop){
		// 	var d = this.data();
	 
		// 	d.counter++; // update data source for the row
	 
		// 	this.invalidate(); // invalidate the data DataTables has cached for this row
		// });
		 
		// Draw once all updates are done
		// table.draw();
		
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
	}

	function tableCreate(retorno) {
		var view = 0;
		var column = 6
		var arrayColumn = new Array(column);
				arrayColumn[0] = "Período";
				arrayColumn[1] = "Mês / Ano";
				arrayColumn[2] = "Valor Investido";
				arrayColumn[3] = "Valor Rendimento";
				arrayColumn[4] = "Saldo";
				arrayColumn[5] = "Objetivo atingido";
		var body = document.getElementsByTagName('tabelaFinal')[0];
		// var tbl = document.createElement('p');
		var tbl = document.createElement('table');
		tbl.style.width = '100%';
		tbl.setAttribute('border', '1');
		tbl.setAttribute('class', 'table');
		tbl.setAttribute('id', 'tabelinha');
		
		var thead = document.createElement('thead');
		var tr = document.createElement('tr');
		for (var t = 0; t < column; t++) {
			var th = document.createElement('th');
			th.appendChild(document.createTextNode(arrayColumn[t]));
			th.setAttribute('font-weight', 'bold');
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		
		var tbdy = document.createElement('tbody');
		for (var i = 0; i < retorno.ObjPeriodo.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < column; j++) {
				var td = document.createElement('td');
				switch(j) {
					case 0: view = retorno.ObjPeriodo[i]; break;
					case 1: view = arrayMesDesc[retorno.ObjDataPeriodo[i].getMonth()]+"/"+retorno.ObjDataPeriodo[i].getFullYear(); break;
					case 2: view = 'R$ '+valorMoeda(retorno.ObjValorInvestidoTotal[i], 2, ',', '.'); break;
					case 3: view = 'R$ '+valorMoeda(retorno.ObjRendimentoTotal[i], 2, ',', '.'); break;
					case 4: view = 'R$ '+valorMoeda(retorno.ObjMontanteTotal[i], 2, ',', '.'); break;
					case 5: view = retorno.ObjPercentObjetivo[i]; break;
					default: // default code block
				}
				td.appendChild(document.createTextNode(view));
				td.setAttribute('text-align', 'right');
				tr.appendChild(td);
			}
			tbdy.appendChild(tr);
		}
		tbl.appendChild(thead);
		tbl.appendChild(tbdy);
		body.appendChild(tbl);

		// $('.tabelaFinal').text(body);
		// var table = document.getElementById ("tabelinha");
	//   table.refresh ();
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