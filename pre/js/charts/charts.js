//Desarrollo de las visualizaciones
import * as d3 from 'd3';
import { numberWithCommas3 } from '../helpers';
import { getInTooltip, getOutTooltip, positionTooltip } from '../modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

const COLOR_PRIMARY_1 = '#F8B05C',
COLOR_ANAG_PRIM_1 = '#BA9D5F', 
COLOR_ANAG_PRIM_2 = '#9E6C51',
COLOR_ANAG_PRIM_3 = '#9E3515',
COLOR_GREY_1 = '#A3A3A3';
let tooltip = d3.select('#tooltip');

//Diccionario
let dictionary = {
    analfabetos: 'Analfabetos',
    primarios: 'Estudios primarios (y sin estudios)',
    secundarios: 'Estudios secundarios',
    superiores: 'Tercer grado y estudios superiores',
    noaplicable: 'No aplicable'   
};

export function initChart() {
    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/EnvejecimientoEnRed/informe_perfil_mayores_2022_social_4_11/main/data/piramide_estudios_censo_2011.csv', function(error,data) {
        if (error) throw error;
        
        //Pirámide con datos absolutos
        let currentType = 'Porcentajes';

        ///Valores iniciales de altura, anchura y márgenes
        let margin = {top: 12.5, right: 25, bottom: 25, left: 70},
            width = document.getElementById('chart').clientWidth - margin.left - margin.right,
            auxHeight = width * 0.67 - margin.top - margin.bottom,
            height = auxHeight < 180 ? 180 : auxHeight;

        let svg = d3.select("#chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let x = d3.scaleLinear()
            .domain([-5,5])
            .range([0,width]);

        let xM = d3.scaleLinear()
            .domain([0,5])
            .range([width / 2, 0]);

        let xF = d3.scaleLinear()
            .domain([0,5])
            .range([width / 2, width]);

        let xAxis = function(svg) {
            svg.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return numberWithCommas3(Math.abs(d)); }));
            svg.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr('y1', '0')
                    .attr('y2', `-${height}`)
            });
        }

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr('class','xaxis')
            .call(xAxis);

        let y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map(function(item) { return item.Edad; }).reverse())
            .padding(.1);

        let edades = document.body.clientWidth < 500 ? 2 : 1;

        let yAxis = function(svg) {
            svg.call(d3.axisLeft(y).tickValues(y.domain().filter(function(d,i){ return !(i%edades)})));
            svg.call(function(g){g.selectAll('.tick line').remove()});
        }

        svg.append("g")
            .call(yAxis);

        //Hombres
        let porcHombres = ['analfabetos_hombres_porc','primarios_hombres_porc','secundarios_hombres_porc','superiores_hombres_porc','noaplicable_hombres_porc'];
        let absHombres = ['analfabetos_hombres_abs','primarios_hombres_abs','secundarios_hombres_abs','superiores_hombres_abs','noaplicable_hombres_abs'];

        let stackedHombresPorc = d3.stack()
            .keys(porcHombres)
            (data);

        let stackedHombresAbs = d3.stack()
            .keys(absHombres)
            (data);

        let colorHombres = d3.scaleOrdinal()
            .domain(porcHombres)
            .range([COLOR_PRIMARY_1, COLOR_ANAG_PRIM_1, COLOR_ANAG_PRIM_2, COLOR_ANAG_PRIM_3, COLOR_GREY_1]);

        //Mujeres
        let porcMujeres = ['analfabetos_mujeres_porc','primarios_mujeres_porc','secundarios_mujeres_porc','superiores_mujeres_porc','noaplicable_mujeres_porc'];
        let absMujeres = ['analfabetos_mujeres_abs','primarios_mujeres_abs','secundarios_mujeres_abs','superiores_mujeres_abs','noaplicable_mujeres_abs'];

        let stackedMujeresPorc = d3.stack()
            .keys(porcMujeres)
            (data);

        let stackedMujeresAbs = d3.stack()
            .keys(absMujeres)
            (data);

        let colorMujeres = d3.scaleOrdinal()
            .domain(porcMujeres)
            .range([COLOR_PRIMARY_1, COLOR_ANAG_PRIM_1, COLOR_ANAG_PRIM_2, COLOR_ANAG_PRIM_3, COLOR_GREY_1]);

        function setPyramids(type) {
            let dataHombres, dataMujeres;
            if(type == 'Porcentajes') {
                dataHombres = stackedHombresPorc;
                dataMujeres = stackedMujeresPorc;
            } else {
                dataHombres = stackedHombresAbs;
                dataMujeres = stackedMujeresAbs;
            }

            colorHombres.domain(dataHombres);
            colorMujeres.domain(dataMujeres);
            
            //Hombres
            svg.append("g")
                .attr('class', 'chart-g')
                .selectAll(".hombres")
                .data(dataHombres)
                .enter()
                .append("g")
                .attr("fill", function(d) { return colorHombres(d.key); })
                .attr('class', function(d) {
                    return 'grupo grupo-' + d.key.split('_')[0];
                })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr('class', 'rect')
                .attr("height", y.bandwidth())
                .attr("y", function(d) { return y(d.data.Edad); })
                .attr("x", function(d) { return x(0); })
                .attr("width", 0)
                .on('mouseover', function(d,i,e) {
                    //Opacidad en barras
                    let parentClass = e[i].parentNode.getAttribute('class').split(' ')[1];
                    let parents = svg.selectAll(`.${parentClass}`);
                    let others = svg.selectAll('.rect');                    
            
                    others.each(function() {
                        this.style.opacity = '0.4';
                    });
                    parents.each(function() {
                        let items = this.getElementsByClassName('rect');
                        for(let i = 0; i < items.length; i++) {
                            items[i].style.opacity = 1;
                        }
                    });

                    //Texto en tooltip
                    let html = '<p class="chart__tooltip--title">Edad: ' + d.data.Edad + '</p>' + 
                        '<p class="chart__tooltip--title_2">' + dictionary[parentClass.split('-')[1]] + '</p>' +
                        '<p class="chart__tooltip--text">Un <b>' + numberWithCommas3(Math.abs(parseFloat(d.data[`${parentClass.split('-')[1]}_hombres_porc`]).toFixed(2))) + '%</b> de la población total (o <b>' + numberWithCommas3(Math.abs(d.data[`${parentClass.split('-')[1]}_hombres_abs`])) + '</b> hombres) tiene este nivel de estudios en el Censo de 2011 en España</p>';
                
                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos los estilos de la línea
                    let bars = svg.selectAll('.rect');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
                .transition()
                .duration(2000)
                .attr("x", function(d) { return xM(Math.abs(d[1])); })
                .attr("width", function(d) { return Math.abs(xM(d[1]) - xM(d[0]));})
            
            //Mujeres
            svg.append("g")
                .attr('class', 'chart-g')
                .selectAll(".mujeres")
                .data(dataMujeres)
                .enter()
                .append("g")
                .attr("fill", function(d) { return colorMujeres(d.key); })
                .attr('class', function(d) {
                    return 'grupo grupo-' + d.key.split('_')[0];
                })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr('class', 'rect')
                .attr("height", y.bandwidth())
                .attr("y", function(d) { return y(d.data.Edad); })
                .attr("x", function(d) { return x(0); })
                .attr("width", 0)
                .on('mouseover', function(d,i,e) {
                    //Opacidad en barras
                    let parentClass = e[i].parentNode.getAttribute('class').split(' ')[1];
                    let parents = svg.selectAll(`.${parentClass}`);
                    let others = svg.selectAll('.rect');                    
            
                    others.each(function() {
                        this.style.opacity = '0.4';
                    });
                    parents.each(function() {
                        let items = this.getElementsByClassName('rect');
                        for(let i = 0; i < items.length; i++) {
                            items[i].style.opacity = 1;
                        }
                    });

                    //Texto en tooltip
                    let html = '<p class="chart__tooltip--title">Edad: ' + d.data.Edad + '</p>' + 
                        '<p class="chart__tooltip--title_2">' + dictionary[parentClass.split('-')[1]] + '</p>' +
                        '<p class="chart__tooltip--text">Un <b>' + numberWithCommas3(Math.abs(parseFloat(d.data[`${parentClass.split('-')[1]}_mujeres_porc`]).toFixed(2))) + '%</b> de la población total (o <b>' + numberWithCommas3(Math.abs(d.data[`${parentClass.split('-')[1]}_mujeres_abs`])) + '</b> mujeres) tiene este nivel de estudios en el Censo de 2011 en España</p>';
                
                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos los estilos de la línea
                    let bars = svg.selectAll('.rect');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
                .transition()
                .duration(2000)
                .attr("x", function(d) { return xF(d[0]); })
                .attr("width", function(d) { return xF(d[1]) - xF(d[0]); })
        }

        function setChart(type, animate = undefined) {
            //Borrado de datos
            svg.selectAll('.chart-g')
                .remove();
            
            if(type != currentType || animate) {
                if (type == 'Absolutos') {

                    x.domain([-2500000,2500000]);
                    svg.select(".xaxis").call(xAxis);                
                    xM.domain([0,2500000]);
                    xF.domain([0,2500000]);

                } else {

                    x.domain([-5,5]);
                    svg.select(".xaxis").call(xAxis);                
                    xM.domain([0,5]);
                    xF.domain([0,5]);

                }

                currentType = type;                
                setPyramids(currentType);
            }            
        }

        function animateChart() {
            setChart(currentType, true);
        }

        /////
        /////
        // Resto - Chart
        /////
        /////
        setPyramids(currentType);

        //Uso de dos botones para ofrecer datos absolutos y en miles
        document.getElementById('data_absolutos').addEventListener('click', function() {
            //Cambiamos color botón
            document.getElementById('data_porcentajes').classList.remove('active');
            document.getElementById('data_absolutos').classList.add('active');

            //Cambio texto
            document.getElementById('texto-reactivo').textContent = 'Personas';

            //Cambiamos gráfico
            setChart('Absolutos');

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        document.getElementById('data_porcentajes').addEventListener('click', function() {
            //Cambiamos color botón
            document.getElementById('data_porcentajes').classList.add('active');
            document.getElementById('data_absolutos').classList.remove('active');

            //Cambio texto
            document.getElementById('texto-reactivo').textContent = 'Porcentaje';

            //Cambiamos gráfico
            setChart('Porcentajes');

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });
        
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        /////
        /////
        // Resto
        /////
        /////

        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_2022_social_4_12','nivel_estudios_generaciones');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('nivel_estudios_generaciones');

        //Captura de pantalla de la visualización
        setTimeout(() => {
            setChartCanvas();
        }, 4000);

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('nivel_estudios_generaciones');
        });

        //Altura del frame
        setChartHeight();        
    });    
}