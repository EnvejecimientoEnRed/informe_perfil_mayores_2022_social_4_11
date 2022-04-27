
///Para los gráficos del informe, no modificamos la altura en ningún momento. En el caso de iframes con altura fija, tendrán un scroll vertical
///Los gráficos se diferenciarán en la altura fija en función de lo observado en la altura desktop
function setChartHeight() {
    document.getElementsByClassName('main')[0].style.height = document.getElementsByClassName('main')[0].clientHeight + 'px';
    pymChild.sendHeight();
}

export { setChartHeight };