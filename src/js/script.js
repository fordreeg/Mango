document.addEventListener('DOMContentLoaded', () => {
    const menuNav = document.querySelector('.menu__nav'),
        menuBg = document.querySelector('.menu__bg'),
        hamburger = document.querySelector('.main__hamburger'),
        hamburgerClose = document.querySelector('.menu__close'),
        faqItems = document.querySelectorAll('.faq__item'),
        faqRounds = document.querySelectorAll('.faq__round_last'),
        faqFooters = document.querySelectorAll('.faq__footer'),
        modal = document.querySelector('.modal__wrap'),
        overlay = document.querySelector('.overlay'),
        modalClose = document.querySelector('.modal-close'),
        consultationClose = document.querySelector('.consultation__close'),
        consultation = document.querySelector('.consultation'),
        btnsShowForm = [
                         document.querySelector('.faq__img-btn'),
                         document.querySelector('.main__call-icon'),
                         document.querySelector('.main__walletBtn'),
                         document.querySelector('.payments__btn'),
                         document.querySelector('.main__btn-login')
        ];

//////////////////////===LISTENERS===////////////////////////
    if (screen.availWidth > 1200) {
        window.onscroll = triggerParallax;
    }

    hamburger.addEventListener('click', () => {
        setHamburgerMenuOptions(0, 1)
    });

    hamburgerClose.addEventListener('click', () => {
        setHamburgerMenuOptions(-100, 1)
    });

    menuBg.addEventListener('click', () => {
        setHamburgerMenuOptions(-100, 1)
    });

    faqItems.forEach(elem => elem.onclick = accordion);

    modalClose.addEventListener('click', () => {
        setModal(modal, overlay, 'none');
    });

    consultationClose.addEventListener('click', () => {
        setModal(consultation, overlay, 'none');
    });

    btnsShowForm.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            setModal(consultation, overlay, 'block');
        });
    });

//////////////////////===HAMBURGER_MENU===////////////////////////
    function setHamburgerMenuOptions(position, opacity) {
        modal.style.display = `${position}%`;
        menuBg.style.opacity = `${opacity}`;

        menuNav.style.left = `${position}%`;
        menuNav.style.opacity = `${opacity}`;
    }

//////////////////////===MODAL/CONSULTATION===////////////////////////
    function setModal(elem, parent, value) {
        elem.style.display = value;
        parent.style.display = value;
    }

//////////////////////===ACCORDION===////////////////////////
    function accordion(event) {
        faqFooters.forEach(item => {
            if (item.closest('.faq__item') === event.currentTarget) {
                item.classList.toggle('faq__footer_active')
            } else {
                item.classList.remove('faq__footer_active')
            }
        });

        faqRounds.forEach(item => {
            if (item.closest('.faq__item') === event.currentTarget) {
                item.classList.toggle('faq__round_last_active')
            } else {
                item.classList.remove('faq__round_last_active')
            }
        });
    }

//////////////////////===PARALLAX===///////////////////////
    function triggerParallax() {
        let scrollPosition = window.pageYOffset,
            toPaymentsSection = document.querySelector('.payments').offsetTop -
                document.querySelector('.main').offsetTop,
            toFaqSection = document.querySelector('.faq').offsetTop -
                document.querySelector('.main').offsetTop;

        setPrimaryParallax(document.querySelectorAll('.main__parallax-item'),
            scrollPosition);
        setParallax(document.querySelectorAll('.advantages__parallax-img'),
            toPaymentsSection, scrollPosition);
        setParallax(document.querySelectorAll('.questions__parallax'),
            toFaqSection, scrollPosition);
    }

    function setPrimaryParallax(collection, scrollPosition) {
        if (window.screen.availWidth > 768) {
            for (let img of collection) {
                if (!img.classList.contains('main__peach-top')) {
                    img.style.transform = `translate3d(0px,
                    ${(scrollPosition * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
                }
            }
        } else {
            for (let img of collection) {
                img.style.transform = `translate3d(0px,
                ${(scrollPosition * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
            }

        }
    }

    function setParallax(collection, sectionPosition, scrollPosition) {
        if (scrollPosition >= sectionPosition) {
            for (let img of collection) {
                img.style.transform = `translate3d(0px,
                ${((scrollPosition - sectionPosition) * img.getAttribute('data-speedMove')) / 10}px, 0px)`;
            }
        }
    }

});

