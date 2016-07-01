function(){
$(function () {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {

        var vetX = [];
        var vetResultado01 = [];
        var vetDataBase = [];
        var valAnterior = '';
        
        for(i=0;i<r_01.length;i++){
            vetX[i] = r_01[i][0];
        }
    
        for(i=0;i<r_01.length;i++){
            if(valAnterior != r_01[i][1]){
                vetResultado01 = vetResultado01.concat({name: r_01[i][1], turboThreshold:10000, data: []});
                valAnterior = r_01[i][1];
            }
        }
        
        for(j=0;j<vetResultado01.length;j++){
        for(i=0;i<r_01.length;i++){ //Para cada linha do vetor vetDrill, percorre o v2 (vetor do banco)
            if(r_01[i][1] === vetResultado01[j].name){//compara se a linha atual do vetDrill corresponde ao serviço do v2 (vetor do banco)
                vetDataBase.push([r_01[i][2]]);
                // vetDataBase.push([[r_01[i][0]],[r_01[i][2]]]); //Acrescenta dados ao subvetor data obedecendo a estrutura [texto,valor]
                // vetDataBase = vetDataBase.concat({y: r_01[i][2]});
                if(i===r_01.length-1){ //Verifica se é a última linha do vetor para não deixar o último registro de fora
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
    
        
        var saldo_inicial = Dashboards.getParameterValue("saldo_inicial");
        var deposito_mensal = Dashboards.getParameterValue("deposito_mensal");
        var rendimento_objetivo = Dashboards.getParameterValue("rendimento_objetivo");
        $('#container').highcharts({
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
                // valuePrefix: 'R$ ',
                // valueDecimals: 2,
                formatter: function() {
                          return '<b>'+ this.series.name +'</b><br/>'+
                          'Em '+this.x +' é '+'R$ '+ this.y.toFixed(2).replace(".",",");
                }
            },
            legend: {
                layout: 'horizontal', //horizontal", "vertical
                align: 'center', //left, center,  right.
                verticalAlign: 'bottom', //top, middle, bottom
                borderWidth: 0,
                floating: false //sobreposto
            },
            plotOptions: {
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
                        radius: 2
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