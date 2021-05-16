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

        if(window.screen.availWidth < 721) {
            additionalElement.style.transform = `translate3d(0px, 
            ${scrollPosition * additionalElement.getAttribute('data-speedMove') / 10}px, 0px)`;
        }

    } else {
        document.onscroll = null;
    }
}

if (window.screen.availWidth < 993) {
    const nav = document.querySelector('.menu__nav'),
        bg = document.querySelector('.menu__bg');

    document.querySelector('.main__hamburger').addEventListener('click', (e) => {
        bg.style.right = '0';
        bg.style.opacity = '1';

        nav.style.left = '0';
        nav.style.opacity = '1';
    });

    document.querySelector('.menu__close').addEventListener('click', (e) => {
        bg.style.right = '-100%';
        bg.style.opacity = '0';

        nav.style.left = '-100%';
        nav.style.opacity = '0';
    });
    document.querySelector('.menu__bg').addEventListener('click', (e) => {
        bg.style.right = '-100%';
        bg.style.opacity = '0';

        nav.style.left = '-100%';
        nav.style.opacity = '0';
    });

}

