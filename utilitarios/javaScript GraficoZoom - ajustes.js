function(){
    var vetX = [];
    var vetResultado01 = [];
    var vetDataBase = [];
    var vetDataX = [];
    var valAnterior = '';
    var dados = p_servidor_IBM_BG_por_banco;
    
    //numeroParaMoeda(this.y.toFixed(2), 2, ',', '.');
    function numeroParaMoeda(n, c, d, t){ //P: numero a converter | numero de casas decimais | separador decimal | separador milha
        c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }
    
    for(i=0;i<dados.length;i++){
        vetX[i] = dados[i][0];
    }
    var uniqueX = [];
    $.each(vetX, function(i, el){
        if($.inArray(el, uniqueX) === -1) uniqueX.push(el);
    });
    var orderX = uniqueX.sort(); 

    for(i=0;i<dados.length;i++){
        if(valAnterior != dados[i][1]){
            vetResultado01 = vetResultado01.concat({name: dados[i][1], turboThreshold:10000, type: 'line', data: []});
            valAnterior = dados[i][1];
        }
    }
    
    var ultimoEncontrado = 0;
    for(j=0;j<vetResultado01.length;j++){ // para cada classe
        for(x=0;x<orderX.length;x++){ // preencher as x posições do data correspondente ao xAxis
            vetDataBase[x] = null; // inicializar com null
            for(i = ultimoEncontrado ;i<dados.length;i++){ // percorrer todos os dados do retorno
                if(dados[i][1] === vetResultado01[j].name){ // classe correspondente OK
                    if(dados[i][0] === orderX[x]){ // data de X correspondente OK
                        vetDataBase[x] = dados[i][2]; // insere valor
                        ultimoEncontrado = i;
                    }
                }
            }
        }
        vetResultado01[j].data = vetDataBase;
        vetDataBase = [];
    }
    
    Highcharts.setOptions({ // formatação do valor numerico
        lang: {
            thousandsSep: '.',
            decimalPoint: ',',
            loading: "Atualizando...",
            noData: "Sem dados carregados."
        }
    });
    
    $('#id_servidor_IBM_BG_por_banco').highcharts({
        colors: ["#45918b", "#4169E1", '#B22222', '#FF8C00', '#800080'],
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Title'
        },
        subtitle: {
            text: 'SubTitle'
        },
        xAxis: {
            // crosshair: true,
            // type: 'trendline',
            categories: orderX
        },
        yAxis: {
            title: {
                text: 'Conexões'
            }
        },
        tooltip: {               
            borderWidth: 2,
            style: {
                fontSize: '9px'
            },                
            useHTML: true,
            headerFormat: '{point.key}<table>', //{point.key}
            pointFormat:  '<tr><td style="color: {series.color}">{series.name}: </td>' +
                          '<td style="text-align: right"><b> {point.y} conexões</b> </td></tr>',
            footerFormat: '</table>',
            valueDecimals: 0,                
            shared: true
        },
        legend: {
            layout: 'horizontal', //horizontal", "vertical
            align: 'center', //left, center,  right.
            verticalAlign: 'bottom', //top, middle, bottom
            borderWidth: 0,
            floating: false //sobreposto
        },
        plotOptions: {
            colors: ["#45918b", "#4169E1", '#B22222', '#FF8C00', '#800080'],
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, "#45918b" ],//Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color("#45918b").setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2,
                    lineWidth: 1,
                    lineColor: '#2F4F4F'
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            },
            line: {                   
                marker: {
                    radius: 2,
                    lineWidth: 1,
                    lineColor: '#6495ED'
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
        series: vetResultado01
    });
} 