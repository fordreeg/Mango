document.addEventListener('scroll', () => {
    parallax(document.querySelectorAll('.main__parallax-item'))
});

function parallax(collection) {
    let scrollPosition = window.pageYOffset;

    if (scrollPosition < 700) {
        for (let img of collection) {
            img.style.transform = `translate3d(0px, 
            ${scrollPosition * img.getAttribute('data-speedMove') / 10}px, 0px)`;
        }
    } else {
        document.onscroll = null;
    }
}





