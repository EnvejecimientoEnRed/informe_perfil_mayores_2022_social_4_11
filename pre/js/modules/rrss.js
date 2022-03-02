function setRRSSLinks(text) {
    let urlPage = window.location.href;

    //Facebook
    let shareFB = document.getElementById("shareFB")
    let fbHref = "https://www.facebook.com/sharer/sharer.php?u="+urlPage
    shareFB.setAttribute("href",fbHref)

    //Twitter
    let shareTW = document.getElementById("shareTW")
    let twHref = "https://twitter.com/intent/tweet?url="+urlPage+"&text="+text+"&original_referer="+urlPage
    shareTW.setAttribute("href",twHref)

    //Linkedin
    let shareLK = document.getElementById("shareLK")
    let lkHref = "https://www.linkedin.com/shareArticle?mini=true&url="+urlPage+"&title="+text+"&summary=&source="
    shareLK.setAttribute("href",lkHref)

    //WhatsApp
    let shareWA = document.getElementById("shareWA")
    let waHref = "https://api.whatsapp.com/send?text="+text+" "+urlPage
    shareWA.setAttribute("href",waHref)
}

export { setRRSSLinks };