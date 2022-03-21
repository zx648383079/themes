declare var Swiper: any;
$(function() {
    bindSwpier();
    bindSearch();
    bindModal('navPanel', 'open');
    bindScroll();
    bindFilter();
});

function bindFilter() {
    $('.filter-bar a').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        const i = $this.index();
        $this.closest('.filter-bar').next().find('.filter-item').each(function(j) {
            $(this).toggle(i < 1 || j % i === 0);
        });
    });
}

function bindScroll() {
    const scrollTop = $('.scroll-top').on('click', function() {
        $('body,html').animate({
            scrollTop: 0
        }, 100);
    });
    const navbar = $('header .nav-bar');
    $(window).on('scroll', function() {
        const top = $(this).scrollTop();
        scrollTop.toggle(top > 50);
        navbar.toggleClass('fixed', top > 120);
        bindCounter(top, top + $(this).innerHeight());
    }).trigger('scroll');
}

function bindCounter(top: number, bottom: number) {
    $('.counter-item').each(function() {
        const ele = $(this);
        if (ele.data('over')) {
            return;
        }
        const offset = ele.offset();
        if (offset.top > bottom || offset.top + ele.height() < top) {
            return;
        }
        ele.data('over', 1);
        const box = ele.find('.item-count');
        const count = parseInt(ele.data('count'));
        const max = parseInt(ele.data('max'));
        let i = 0;
        const handle = setInterval(() => {
            if (max > 0 && i > max) {
                box.html(`<span class="count">${max}</span><span class="count-tag">+</span>`);
                clearInterval(handle);
                return;
            }
            box.html(`<span class="count">${i}</span>`);
            i ++;
            if (i > count) {
                clearInterval(handle);
            }
        }, 100);
    });
}

function bindSwpier() {
    new Swiper('.patter-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
    });
    new Swiper('.team-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            700: {
                slidesPerView: 2,
            },
            1100: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });
    new Swiper('.comment-swiper', {
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });
    new Swiper('.post-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            780: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });
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
