import 'url-search-params-polyfill';
import './modules/tabs';
import { initChart } from './charts/charts';

//Necesario para importar los estilos de forma automática en la etiqueta 'style' del html final
import '../css/main.scss';

/////////////
//////// RECOGIDA DE PARÁMETROS DE LA URL
/////////////
getUrlParams();

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    //Visualización y tipo de iframe
    const iframe = params.get('iframe');

    initChart(iframe);
}