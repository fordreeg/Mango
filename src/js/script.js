document.addEventListener('scroll', () => {
    parallax(document.querySelectorAll('.main__parallax-item'), document.querySelector('.main__peach-top'))
});

function parallax(collection, additionalElement = 0) {
    let scrollPosition = window.pageYOffset;

    if (scrollPosition < 700) {
        for (let img of collection) {
            img.style.transform = `translate3d(0px, 
            ${scrollPosition * img.getAttribute('data-speedMove') / 10}px, 0px)`;
        }

        if(window.screen.width < 721) {
            additionalElement.style.transform = `translate3d(0px, 
            ${scrollPosition * additionalElement.getAttribute('data-speedMove') / 10}px, 0px)`;
        }
    } else {
        document.onscroll = null;
    }
}




