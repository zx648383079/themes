declare var Swiper: any;
$(function() {
    bindScroll();
    bindSearch();
    bindSwpier();
    bindNavbar();
});

function bindNavbar() {
    const navbar = $('.nav-outline-bar').on('click', '.nav-toggle-btn', function() {
        navbar.toggleClass('nav-opened');
    });
}

function bindSwpier() {
    const banner = new Swiper('.banner-container .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    // banner.on('slideChange', e => {
    //     console.log(e);
        
    // });
    new Swiper('.partner-swiper', {
        slidesPerView: 3,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });
    new Swiper('.blog-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });
}

function bindScroll() {
    const scrollTop = $('.back-top-btn').on('click', function() {
        $('body,html').animate({
            scrollTop: 0
        }, 100);
    });
    // const navbar = $('.nav-outline-bar');
    $(window).on('scroll', function() {
        const top = $(this).scrollTop();
        scrollTop.toggle(top > 50);
        // navbar.toggleClass('fixed', top > 120);
        // bindCounter(top, top + $(this).innerHeight());
    }).trigger('scroll');
}

function bindSearch(name = 'searchModal') {
    const modal = bindModal(name);
}

function bindModal(name: string, cls?: string): JQuery<HTMLElement> {
    const modal = $('#' + name).on('click', '.close-btn', function() {
        if (cls) {
            modal.removeClass(cls);
            return;
        }
        modal.hide();
    });
    $('*[data-modal="' + name + '"]').on('click', function(e) {
        e.preventDefault();
        if (cls) {
            modal.addClass(cls);
            return;
        }
        modal.show();
    });
    return modal;
}