export function setFixedIframeUrl(title) {
    //Iframe fijo
    let id1 = document.getElementById('iframe-fixed');
    id1.innerHTML = `<iframe src="https://EnvejecimientoEnRed/informe-2022-viz/?chart=${title}&iframe=fixed" style="height:680px;width:100%;" title="${title}"></iframe>`;
    
    //Iframe responsive
    let id2 = document.getElementById('iframe-responsive');
    id2.innerHTML = `<div id="viz_cchs_informe_perfil_mayores_2022"></div><script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script><script>let pymParent = new pym.Parent('viz_cchs_informe_perfil_mayores_2022', 'https://EnvejecimientoEnRed.github.io/informe-2022-viz/?chart=${title}&iframe=responsive', {});</script>`;
}