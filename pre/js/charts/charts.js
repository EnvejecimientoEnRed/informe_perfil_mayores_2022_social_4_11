//Desarrollo de las visualizaciones
//import * as d3 from 'd3';
//import { numberWithCommas2 } from './helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

export function initChart4_1(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Formas de convivencia de las personas de 65 y más años por sexo en España';
    document.getElementById('subtitle').textContent = 'Figura 4.1. Comparativa 2008-2018. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'Eurostat (Distribution of population aged 65 or over by type of household; EU-SILC)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('formas_convivencia_mayores');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('formas_convivencia_mayores');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('formas_convivencia_mayores');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_2(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución del estado civil de las personas de 65 y más años en España';
    document.getElementById('subtitle').textContent = 'Figura 4.2. Evolución entre 1970 y 2018. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Censos de Población y Viviendas y EPA)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_estado_civil');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('evolucion_estado_civil');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('evolucion_estado_civil');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_3(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Estado civil de las personas mayores al fallecer por sexo en España, 2018';
    document.getElementById('subtitle').textContent = 'Figura 4.3. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Defunciones por CCAA, edad, sexo y estado civil)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('estado_civil_fallecimiento');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('estado_civil_fallecimiento');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('estado_civil_fallecimiento');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_4(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Patrones de cuidado informal. Quién cuida a quién en España, 2014';
    document.getElementById('subtitle').textContent = 'Figura 4.4. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'CIS (Estudio 3.009. Cuidados a dependientes)';
    document.getElementById('data-note').textContent = 'Este escenario se ha calculado con el cómputo de todas las horas de cuidado provisto y se ha representado en porcentajes. Las flechas indican la cantidad de cuidado aportado por cada uno de los cuatro tipos de cuidador a cada uno de los cuatro tipos de dependientes. No se representan todos los flujos para facilitar la lectura.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('patrones_cuidado_informal');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('patrones_cuidado_informal');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('patrones_cuidado_informal');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_5(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Distribución porcentual de los cuidadores principales por sexo de la personas mayor que necesita ayuda, 2014';
    document.getElementById('subtitle').textContent = 'Figura 4.5.';
    document.getElementById('data-source').textContent = 'CIS (Encuesta 3.009)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('distribucion_cuidadores_principales');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('distribucion_cuidadores_principales');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('distribucion_cuidadores_principales');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_6(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Efectos del cuidado en el empleo por cuidar de familiares incapacitados, 2018';
    document.getElementById('subtitle').textContent = 'Figura 4.6. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'Eurostat';
    document.getElementById('data-note').textContent = 'La base de datos utilizados tiene como título "Persons in employment or with previous employment experience by effects of care of incapacitated relatives".';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('efectos_cuidado_personas');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('efectos_cuidado_personas');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('efectos_cuidado_personas');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_7(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Cuidadores de personas dependientes según sexo y edad en España, 2016';
    document.getElementById('subtitle').textContent = 'Figura 4.7. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta de Condiciones de Vida. Módulo 2016: acceso a los servicios)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('cuidadores_de_dependientes');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('cuidadores_de_dependientes');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('cuidadores_de_dependientes');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_8(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Contribuciones de los abuelos y abuelas* a la sociedad española, 2018';
    document.getElementById('subtitle').textContent = 'Figura 4.8. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'CIS (Barómetro 3207 de marzo de 2018)';
    document.getElementById('data-note').textContent = 'No todos los mayores son abuelos y abuelas, aunque también contribuyen.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('contribuciones_abuelos');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('contribuciones_abuelos');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('contribuciones_abuelos');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_9(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Ratio de plazas de residencias de la población de 65 y más años en España, 2019';
    document.getElementById('subtitle').textContent = 'Figura 4.9. Ratio por cada 100 habitantes de 65 y más años. A nivel autonómico y provincial.';
    document.getElementById('data-source').textContent = 'Envejecimiento en Red (base de datos de residencias)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('plazas_residenciales');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('plazas_residenciales');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('plazas_residenciales');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_10(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Personas que declaran ser felices según edad. Comparativa España y UE-28, 2018';
    document.getElementById('subtitle').textContent = 'Figura 4.10. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'Eurostat (Frequency of being happy in the last 4 weeks; EU-SILC)';
    document.getElementById('data-note').textContent = 'Aquí se representa el % de personas que declara ser feliz la mayor parte del tiempo. Otras categorías no representadas son: a veces, raramente, nunca.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('personas_felices_europa');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('personas_felices_europa');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('personas_felices_europa');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_11(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Personas que declaran ser felices según edad en España, 2018';
    document.getElementById('subtitle').textContent = 'Figura 4.11. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'Eurostat (Frequency of being happy in the last 4 weeks; EU-SILC)';
    document.getElementById('data-note').textContent = 'Aquí se representa el % de personas que declara ser feliz la mayor parte del tiempo. Otras categorías no representadas son: a veces, raramente, nunca.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('personas_felices_espana');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('personas_felices_espana');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('personas_felices_espana');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_12(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Pirámide de población por nivel de estudios en España, 2011';
    document.getElementById('subtitle').textContent = 'Figura 4.12. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Censo de población)';
    document.getElementById('data-note').textContent = 'Estudios primarios incluye personas sin estudios. Se representan aparte los analfabetos.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('nivel_estudios_generaciones');

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
}

export function initChart4_13(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución del nivel de estudios de las personas de 65 y más años en España';
    document.getElementById('subtitle').textContent = 'Evolución entre 1970 y 2011. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Censos de población)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_nivel_estudios');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('evolucion_nivel_estudios');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('evolucion_nivel_estudios');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart4_14(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución del porcentaje de personas que han utilizado internet en los últimos tres meses en España por grupo de edad';
    document.getElementById('subtitle').textContent = 'Figura 4.14. Evolución entre 2007 y 2020. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta sobre equipamiento y uso de Tecnologías de la Información y la Comunicación)';
    document.getElementById('data-note').textContent = 'Uso de internet durante los últimes 3 meses';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('uso_internet');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('uso_internet');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('uso_internet');
    });

    //Altura del frame
    setChartHeight(iframe);
}