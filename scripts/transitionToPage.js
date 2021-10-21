function transitionToPage(href) {
    document.querySelector('body').style.opacity = 0;
    document.querySelector('body').style.transition = '.5s';
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('body').style.opacity = 1
    document.querySelector('body').style.transition = '.5s'
})