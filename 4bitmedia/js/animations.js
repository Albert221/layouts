new WOW({
    mobile: false
}).init();

document.querySelector('.header').addEventListener('click', function(e) {
    if (e.target.classList.contains('nav--link'))
        var target = e.target;
    else if (e.target.classList.contains('header--logo-image'))
        var target = e.target.parentNode;
    else
        return;
    
    e.preventDefault();

    var hash = target.href.substr(target.href.indexOf('#') + 1);
    var offset = document.querySelector('#' + hash).offsetTop;
    offset = offset ? offset : 0;

    offset -= document.querySelector('.header').clientHeight;

    window.scroll({
        top: offset,
        left: 0,
        behavior: 'smooth'
    });
    window.location.hash = hash;
});

var navTransparency = function() {
    var header = document.querySelector('.header');
    var sloganY = document.querySelector('.hero--slogan').offsetTop;

    if (window.scrollY + header.clientHeight < sloganY)
        header.classList.add('header__transparent');
    else
        header.classList.remove('header__transparent');
};

window.addEventListener('load', navTransparency);
window.addEventListener('scroll', navTransparency);