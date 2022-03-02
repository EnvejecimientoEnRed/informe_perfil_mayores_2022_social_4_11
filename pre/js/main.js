import 'url-search-params-polyfill';
import './modules/tabs';
import * as charts from './charts/charts';

//Necesario para importar los estilos de forma automática en la etiqueta 'style' del html final
import '../css/main.scss';

/////////////
//////// RECOGIDA DE PARÁMETROS DE LA URL
/////////////
getUrlParams();

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    //Visualización y tipo de iframe
    const viz = params.get('chart');
    const iframe = params.get('iframe');

    setChart(viz, iframe);
}

function setChart(viz, iframe) {
    pymChild.onMessage('viewport-iframe-position', onScroll);    

    function onScroll(parentInfo) {
        let steps = parentInfo.split(" ");

        if(steps[2] != 0 && !isChartActive) {
            switch(viz){
                //Social
                case '4_1':
                    charts.initChart4_1(iframe, steps[2]);
                    break;
                case '4_2':
                    charts.initChart4_2(iframe, steps[2]);
                    break;
                case '4_3':
                    charts.initChart4_3(iframe, steps[2]);
                    break;
                case '4_4':
                    charts.initChart4_4(iframe, steps[2]);
                    break;
                case '4_5':
                    charts.initChart4_5(iframe, steps[2]);
                    break;
                case '4_6':
                    charts.initChart4_6(iframe, steps[2]);
                    break;
                case '4_7':
                    charts.initChart4_7(iframe, steps[2]);
                    break;
                case '4_8':
                    charts.initChart4_8(iframe, steps[2]);
                    break;
                case '4_9':
                    charts.initChart4_9(iframe, steps[2]);
                    break;
                case '4_10':
                    charts.initChart4_10(iframe, steps[2]);
                    break;
                case '4_11':
                    charts.initChart4_11(iframe, steps[2]);
                    break;
                case '4_12':
                    charts.initChart4_12(iframe, steps[2]);
                    break;
                case '4_13':
                    charts.initChart4_13(iframe, steps[2]);
                    break;
                case '4_14':
                    charts.initChart4_14(iframe, steps[2]);
                    break;
                default: //Si no hay parámetros en la URL
                    charts.initChart4_1('responsive', steps[2]);
                        break;                
            }
            isChartActive = true;
        }
    }    
}