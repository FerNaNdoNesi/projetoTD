function(){
$(function () {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {

        var vetX = [];
        var vetResultado01 = [];
        var vetDataBase = [];
        var valAnterior = '';
        
        //numeroParaMoeda(this.y.toFixed(2), 2, ',', '.');
        function numeroParaMoeda(n, c, d, t){ //P: numero a converter | numero de casas decimais | separador decimal | separador milha
            c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }
        
        for(i=0;i<r_01_investimento.length;i++){
            vetX[i] = r_01_investimento[i][0];
        }
    
        for(i=0;i<r_01_investimento.length;i++){
            if(valAnterior != r_01_investimento[i][1]){
                vetResultado01 = vetResultado01.concat({name: r_01_investimento[i][1], turboThreshold:10000, data: []});
        		valAnterior = r_01_investimento[i][1];
        	}
        }
        
        for(j=0;j<vetResultado01.length;j++){
        for(i=0;i<r_01_investimento.length;i++){ //Para cada linha do vetor vetDrill, percorre o v2 (vetor do banco)
        	if(r_01_investimento[i][1] === vetResultado01[j].name){//compara se a linha atual do vetDrill corresponde ao serviço do v2 (vetor do banco)
                vetDataBase.push([r_01_investimento[i][2]]);
    			// vetDataBase.push([[r_01[i][0]],[r_01[i][2]]]); //Acrescenta dados ao subvetor data obedecendo a estrutura [texto,valor]
                // vetDataBase = vetDataBase.concat({y: r_01[i][2]});
    			if(i===r_01_investimento.length-1){ //Verifica se é a última linha do vetor para não deixar o último registro de fora
    				vetResultado01[j].data = vetDataBase;
    			}
    		}else{//Caso a linha atual de vetDrill não seja correspondente a linha atual de v2, ou seja, acabou de ler um grupo de linhas de um serviço
    			if(vetDataBase.length > 0){// e Vetor data não estiver vazio
    				vetResultado01[j].data = vetDataBase; //acrescenta dados
    			}
    			vetDataBase = []; //Limpa vetor
    		}
    	}
    }
    Highcharts.setOptions({
        lang: {
            thousandsSep: '.',
            decimalPoint: ',',
            numericSymbols: [' reais'],
            loading: "Atualizando...",
            noData: "Sem dados carregados."
        }
    });
    
        var saldo_inicial = Dashboards.getParameterValue("saldo_inicial");
        var deposito_mensal = Dashboards.getParameterValue("deposito_mensal");
        var rendimento_objetivo = Dashboards.getParameterValue("rendimento_objetivo");
        $('#container_rendimento').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Investindo R$'+deposito_mensal+' por mês você se aposenta com um salario de R$'+rendimento_objetivo
            },
            subtitle: {
                text: 'Em menos de 10 anos você pode se aposentar'//document.ontouchstart === undefined ?
                        //'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                crosshair: true,
                // type: 'trendline'
                // type: 'datetime'
                categories: vetX
                // minPadding: 0.05,
                // maxPadding: 100000.05
            },
            yAxis: {
                title: {
                    text: 'Valores em R$'
                }
            },
            tooltip: {
                //positioner: function () {
                //    return { x: 0, y: 0 };
                //},
                
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
                
                //formatter: function() {
                //          return '<b>'+ this.series.name +'</b><br/>'+
                //          'Em '+this.x +' é '+'R$ '+ numeroParaMoeda(this.y.toFixed(2), 2, ',', '.');//this.y.toFixed(2).replace(".",",");
                //},
                //pointFormat: '<b>'+series.name+'</b><br/>: Em '+series.x+' é R$ {y}<br/>',
                
                //pointFormat: '<span style="color:{series.color}">{series.name}</span>: R$ {point.y} <br/>',
                shared: true
            },/*
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
                shared: true
            },*/
            legend: {
                layout: 'horizontal', //horizontal", "vertical
                align: 'center', //left, center,  right.
                verticalAlign: 'bottom', //top, middle, bottom
                borderWidth: 0,
                floating: false //sobreposto
            },
            plotOptions: { //#45918b
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
                        radius: 2,
                        lineWidth: 1,
                        lineColor: '#ffffff'
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            credits: {
                        enabled: false
            },
            // data: r_01
            series: vetResultado01
            // series: [{
                // type: 'line',
                // name: 'R$',
                // data: r_01,
                // visible: true,
                // turboThreshold:5000//set it to a larger threshold, it is by default to 1000
            // }]
             // series: [{
            // name: 'Tokyo',
            // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            // }, {
                // name: 'New York',
                // data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            // }]
        });
    });
}); 
} 