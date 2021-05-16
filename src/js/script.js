document.addEventListener('DOMContentLoaded', () => {
//////////////////////===LISTENERS===////////////////////////////////////////////
    (() => {
        const menuNav = document.querySelector('.menu__nav'),
            menuBg = document.querySelector('.menu__bg'),
            hamburger = document.querySelector('.main__hamburger'),
            hamburgerClose = document.querySelector('.menu__close');

        hamburger.addEventListener('click', () => {
            setBurgerMenuOptions(0, 1)
        });

        hamburgerClose.addEventListener('click', () => {
            setBurgerMenuOptions(-100, 1)
        });
        menuBg.addEventListener('click', () => {
            setBurgerMenuOptions(-100, 1)
        });

        function setBurgerMenuOptions(position, opacity) {
            menuBg.style.right = `${position}%`;
            menuBg.style.opacity = `${opacity}`;

            menuNav.style.left = `${position}%`;
            menuNav.style.opacity = `${opacity}`;
        }
    })();
//////////////////////===PARALLAX===////////////////////////////////////////////
    window.onscroll = triggerParallax;

    function triggerParallax() {
        let scrollPosition = window.pageYOffset,
            paymentsSection = document.querySelector('.payments').offsetTop -
                                document.querySelector('.main').offsetTop,
            advantagesSection = document.querySelector('.advantages').offsetTop -
                document.querySelector('.main').offsetTop;

        setPrimaryParallax(document.querySelectorAll('.main__parallax-item'),
            scrollPosition);
        setPaymentsParallax(document.querySelectorAll('.payments__shapes'),
            paymentsSection, scrollPosition);
        setAdvantagesParallax(document.querySelectorAll('.advantages__parallax-img'),
            advantagesSection, scrollPosition);
    }

    function setPrimaryParallax(collection, scrollPosition) {
        if (window.screen.availWidth > 768) {
            for (let img of collection) {
                if (!img.classList.contains('main__peach-top')) {
                    img.style.transform = `translate3d(0px,
                    ${(scrollPosition  * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
                }
            }
        } else {
            for (let img of collection) {
                img.style.transform = `translate3d(0px,
                ${(scrollPosition * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
            }

        }
    }

    function setPaymentsParallax(collection, sectionPosition, scrollPosition) {
        if (scrollPosition >= sectionPosition) {
            for (let img of collection) {
                img.style.transform = `translate3d(0px,
                ${((scrollPosition - sectionPosition) * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
            }
        }
    }

    function setAdvantagesParallax(collection, sectionPosition, scrollPosition) {
        if (scrollPosition >= sectionPosition) {
            for (let img of collection) {
                img.style.transform = `translate3d(0px,
                ${((scrollPosition - sectionPosition) * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
            }
        }
    }

});

