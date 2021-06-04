$(function() {
    const pages = ['#blog', '#link', '#about', '#resume', '#portfolio','#detail', '#nav'];
    pages.forEach(item => {
        new PerfectScrollbar(item, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    })
    const animates = [
        ['backInDown', 'backOutDown'],
        ['bounceIn', 'bounceOut'],
        ['fadeIn', 'fadeOut'],
        ['fadeInDown', 'fadeOutDown'],
        ['fadeInDownBig', 'fadeOutDownBig'],
        ['flipInX', 'flipOutX'],
        ['flipInY', 'flipOutY'],
        ['rotateIn', 'rotateOut'],
        ['rollIn', 'rollOut'],
        ['zoomIn', 'zoomOut'],
        ['zoomInDown', 'zoomOutDown'],
        ['zoomInLeft', 'zoomOutLeft'],
        ['zoomInRight', 'zoomOutRight'],
        ['slideInDown', 'slideOutDown'],
        ['slideInLeft', 'slideOutLeft'],
    ];

    function runAnimate(inEle: JQuery, outEle: JQuery) {
        const item = animates[Math.floor(Math.random() * animates.length)];
        const inEnd = () => {
            inEle.off('animationend', inEnd).removeClass('animate__animated animate__' + item[0]);
        };
        const outEnd = () => {
            outEle.off('animationend', outEnd).removeClass('active animate__animated animate__' + item[1]);
        };
        inEle.on('animationend', inEnd).addClass('active animate__animated animate__' + item[0]);
        outEle.on('animationend', outEnd).addClass('animate__animated animate__' + item[1])
    }

    function goSection(href: string, menuHref: string = href) {
        links.each(function() {
            let $this = $(this);
            const isActive = $this.attr('href') === menuHref;
            $this.closest('li').toggleClass('active', isActive);
            if (isActive) {
                document.title = $this.text();
            }
        });
        let inEle;
        let outEle;
        const current = href ? href.substr(1) : '';
        $('.page-area .animate-section').each(function() {
            let $this = $(this);
            const isActive = $this.attr('id') === current;
            if (isActive) {
                inEle = $this;
                return;
            }
            if ($this.hasClass('active')) {
                outEle = $this;
            }
        });
        if (inEle && outEle) {
            runAnimate(inEle, outEle);
        }
    }
    function setHistory(name: string, uri: string) {
        let url = window.location.href.split('#')[0] + uri;
        history.pushState(null, name, url);
    }
    $('.menu-toggle').click(function() {
        $(this).closest('.page-box').toggleClass('page-toggle');
    });
    const links = $('.menu-bar a').click(function(e) {
        //e.preventDefault();
        goSection($(this).attr('href'));
    });

    $('.nav-action .nav-next').click(function(e) {
        e.preventDefault();
        let index = -1;
        links.each(function(this: HTMLLinkElement, i: number) {
            if (this.getAttribute('href') === location.hash) {
                index = i;
            }
        });
        const item = links.eq(index + 1);
        goSection(item.attr('href'));
        setHistory(item.text(), item.attr('href'))
    });
    $('.nav-action .nav-previous').click(function(e) {
        e.preventDefault();
        let index = 1;
        links.each(function(this: HTMLLinkElement, i: number) {
            if (this.getAttribute('href') === location.hash) {
                index = i;
            }
        });
        const item = links.eq(index - 1);
        goSection(item.attr('href'));
        setHistory(item.text(), item.attr('href'))
    });
    $('.items-box a').click(function(e) {
        e.preventDefault();
        goSection('#detail', '#blog');
        setHistory('detail', '#detail')
    });
    goSection(location.hash ? location.hash : '#home');
});