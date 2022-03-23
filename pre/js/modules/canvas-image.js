import html2canvas from 'html2canvas';
let innerCanvas, innerCustomCanvas;

function setChartCanvas() {
    html2canvas(document.querySelector("#chartBlock"), {width: document.querySelector("#chartBlock").clientWidth, height: document.querySelector("#chartBlock").clientHeight, imageTimeout: 8000, useCORS: true}).then(canvas => { innerCanvas = canvas; });
}

function setCustomCanvas() {
    html2canvas(document.querySelector("#chart"), {width: document.querySelector("#chart").clientWidth, height: document.querySelector("#chart").clientHeight, imageTimeout: 6000, useCORS: true}).then(canvas => { innerCustomCanvas = canvas; });
}

function setChartCanvasImage(title) {    
    var image = innerCanvas.toDataURL();
    // Create a link
    var aDownloadLink = document.createElement('a');
    // Add the name of the file to the link
    aDownloadLink.download = title+'_informe_2022_perfil_mayores.png';
    // Attach the data to the link
    aDownloadLink.href = image;
    // Get the code to click the download link
    aDownloadLink.click();
}

function setChartCustomCanvasImage(title) {    
    var image = innerCustomCanvas.toDataURL();
    // Create a link
    var aDownloadLink = document.createElement('a');
    // Add the name of the file to the link
    aDownloadLink.download = title+'_informe_2022_perfil_mayores.png';
    // Attach the data to the link
    aDownloadLink.href = image;
    // Get the code to click the download link
    aDownloadLink.click();
}

export { setChartCanvas, setCustomCanvas, setChartCanvasImage, setChartCustomCanvasImage };