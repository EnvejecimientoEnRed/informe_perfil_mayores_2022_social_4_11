/*
* FUNCIONES TOOLTIP
*/
function getInTooltip(tooltip) {
    tooltip.style('display','block').style('opacity', 1);
}

function getOutTooltip(tooltip) {
    tooltip.style('display','none').style('opacity', 0);
}

function positionTooltip(event, tooltip) {
    let x = event.pageX;
    let y = event.pageY;

    //Tamaño
    let ancho = parseInt(tooltip.style('width'));
    
    let distanciaAncho = isNaN(ancho) ? 100 : ancho;

    //Posición
    let left = window.innerWidth / 2 > x ? 'left' : 'right';
    let mobile = window.innerWidth < 525 ? -40 : 10; //Cambiar distancias en función de la visualización
    let horizontalPos = left == 'left' ? 10 : - distanciaAncho + mobile;

    tooltip.style('top', y + 17 + 'px');
    tooltip.style('left', (x + horizontalPos) + 'px');
}

export {
    getInTooltip,
    getOutTooltip,
    positionTooltip
}