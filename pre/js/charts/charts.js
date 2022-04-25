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
COLOR_GREY_1 = '#D6D6D6';
let tooltip = d3.select('#tooltip');

export function initChart(iframe) {
    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_social_4_11/main/data/piramide_estudios_censo_2011.csv', function(error,data) {
        if (error) throw error;
        
        //Pirámide con datos absolutos
        let currentType = 'Porcentajes';

        ///Valores iniciales de altura, anchura y márgenes
        let margin = {top: 5, right: 25, bottom: 20, left: 70},
            width = document.getElementById('chart').clientWidth - margin.left - margin.right,
            height = width * 0.67 - margin.top - margin.bottom;

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
            .attr('class','x-axis')
            .call(xAxis);

        let y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map(function(item) { return item.Edad; }).reverse())
            .padding(.1);

        let yAxis = function(svg) {
            svg.call(d3.axisLeft(y).tickValues(y.domain().filter(function(d,i){ return !(i%1)})));
            svg.call(function(g){g.selectAll('.tick line').remove()});
        }

        svg.append("g")
            .call(yAxis);

        let pruebaHombres = ['analfabetos_hombres_porc','primarios_hombres_porc','secundarios_hombres_porc','superiores_hombres_porc','no_aplicable_hombres_porc'];

        let stackedHombres = d3.stack()
            .keys(pruebaHombres)
            (data);

        let colorHombres = d3.scaleOrdinal()
            .domain(pruebaHombres)
            .range([COLOR_PRIMARY_1, COLOR_ANAG_PRIM_1, COLOR_ANAG_PRIM_2, COLOR_ANAG_PRIM_3, COLOR_GREY_1]);

        let pruebaMujeres = ['analfabetos_mujeres_porc','primarios_mujeres_porc','secundarios_mujeres_porc','superiores_mujeres_porc','no_aplicable_mujeres_porc'];

        let stackedMujeres = d3.stack()
            .keys(pruebaMujeres)
            (data);

        let colorMujeres = d3.scaleOrdinal()
            .domain(pruebaMujeres)
            .range([COLOR_PRIMARY_1, COLOR_ANAG_PRIM_1, COLOR_ANAG_PRIM_2, COLOR_ANAG_PRIM_3, COLOR_GREY_1]);

        function init() {
            //Hombres
            svg.append("g")
                .attr('class', 'chart-g')
                .selectAll(".hombres")
                .data(stackedHombres)
                .enter()
                .append("g")
                .attr("fill", function(d) { return colorHombres(d.key); })
                .attr('class', function(d) {
                    return 'grupo grupo-' + d.key;
                })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr("height", y.bandwidth())
                .attr("y", function(d) { return y(d.data.Edad); })
                .attr("x", function(d) { return x(0); })
                .attr("width", 0)
                .on('mouseover', function(d,i,e) {
                    //Dibujo contorno de la rect
                    this.style.stroke = '#000';
                    this.style.strokeWidth = '1';

                    //Texto en tooltip
                    let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                        '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                        '<p class="chart__tooltip--text">Número absoluto de personas: ' + numberWithCommas3(parseInt(d.Valor))+ '</p>';
                
                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Fuera contorno
                    this.style.stroke = 'none';
                    this.style.strokeWidth = '0';

                    //Fuera tooltip
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
                .data(stackedMujeres)
                .enter()
                .append("g")
                .attr("fill", function(d) { return colorMujeres(d.key); })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr("height", y.bandwidth())
                .attr("y", function(d) { return y(d.data.Edad); })
                .attr("x", function(d) { return x(0); })
                .attr("width", 0)
                .on('mouseover', function(d,i,e) {
                    //Dibujo contorno de la rect
                    this.style.stroke = '#000';
                    this.style.strokeWidth = '1';

                    //Texto en tooltip
                    let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                        '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                        '<p class="chart__tooltip--text">Número absoluto de personas: ' + numberWithCommas3(parseInt(d.Valor))+ '</p>';
                
                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Fuera contorno
                    this.style.stroke = 'none';
                    this.style.strokeWidth = '0';

                    //Fuera tooltip
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

                    x.domain([-500000,500000]);
                    svg.select(".x-axis").call(xAxis);                
                    xM.domain([0,500000]);
                    xF.domain([0,500000]);

                } else {

                    x.domain([-5,5]);
                    svg.select(".x-axis").call(xAxis);                
                    xM.domain([0,5]);
                    xF.domain([0,5]);

                }

                init();
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
        init();

        //Uso de dos botones para ofrecer datos absolutos y en miles
        document.getElementById('data_absolutos').addEventListener('click', function() {
            //Cambiamos color botón
            document.getElementById('data_porcentajes').classList.remove('active');
            document.getElementById('data_absolutos').classList.add('active');

            //Cambio texto
            document.getElementById('texto-reactivo').textContent = 'Personas';

            //Cambiamos gráfico
            setChart('Absolutos');

            //Cambiamos valor actual
            currentType = 'Absolutos';
        });

        document.getElementById('data_porcentajes').addEventListener('click', function() {
            //Cambiamos color botón
            document.getElementById('data_porcentajes').classList.add('active');
            document.getElementById('data_absolutos').classList.remove('active');

            //Cambio texto
            document.getElementById('texto-reactivo').textContent = 'Porcentaje';

            //Cambiamos gráfico
            setChart('Porcentajes');

            //Cambiamos valor actual
            currentType = 'Porcentajes';
        });
        
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
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
        setChartCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('nivel_estudios_generaciones');
        });

        //Altura del frame
        setChartHeight(iframe);        
    });    
}