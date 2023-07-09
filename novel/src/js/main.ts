class NovelSwiper {
    constructor(
        private target: JQuery<HTMLDivElement>
    ) {
        this.init();
    }

    private defaultMaxWidth = 800;
    private defaultMinWidth = 160;
    private defaultGap = 20;
    private itemWidth = 0;
    private $win = $(window);
    private index = -1;
    private itemCount = 0;
    private timeout = 5000;
    private timeHandler = 0;


    private init() {
        let dotBar = this.target.find('.swiper-navigation-dot');
        if (dotBar.length === 0) {
            dotBar = $('<div class="swiper-navigation-dot"></div>');
            this.target.append(dotBar);
        }
        this.itemCount = this.target.find('.swiper-item').length;
        let html = '';
        for (let i = 0; i < this.itemCount; i++) {
            html += '<span></span>';
        }
        dotBar.html(html);
        this.bindEvent();
        this.resize();
        this.scrollTo(0);
        this.bindAutoplay();
    }

    private bindAutoplay() {
        if (this.timeHandler > 0) {
            clearTimeout(this.timeHandler);
            this.timeHandler = 0;
        }
        this.timeHandler = setTimeout(() => {
            this.next();
        }, this.timeout);
    }

    public stop() {
        if (this.timeHandler > 0) {
            clearTimeout(this.timeHandler);
            this.timeHandler = 0;
        }
    }

    private bindEvent() {
        const that = this;
        this.$win.on('resize', this.resize.bind(this));
        this.target.on('click', '.swiper-navigation-dot span', function() {
            that.scrollTo($(this).index());
        }).on('mouseover', () => {
            this.stop();
        }).on('mouseleave', () => {
            this.bindAutoplay();
        });
    }

    public resize() {
        const that = this;
        this.itemWidth = Math.min(this.target.width() - this.defaultGap, this.defaultMaxWidth);
        const items = this.target.find('.swiper-item');
        const count = items.length;
        this.target.find('.swiper-item-body').width(this.itemWidth);
        this.target.find('.swiper-body').width(this.itemWidth + this.defaultMinWidth * (count - 1) + count * (this.defaultGap + 10));
        items.each(function() {
            const $this = $(this);
            $this.width($this.hasClass('swiper-item-active') ? that.itemWidth : that.defaultMinWidth);
        });
    }

    public next() {
        let i = this.index + 1;
        if (i >= this.itemCount) {
            i = 0;
        }
        this.scrollTo(i);
    }

    public previous() {
        let i = this.index - 1;
        if (i < 0) {
            i = this.itemCount - 1;
        }
        this.scrollTo(i);
    }

    public scrollTo(i: number) {
        const that = this;
        this.target.find('.swiper-item').each(function(j) {
            const isActive = i === j;
            const $this = $(this);
            $this.toggleClass('swiper-item-active', isActive);
            $this.width(isActive ? that.itemWidth : that.defaultMinWidth);
        });
        this.target.find('.swiper-navigation-dot span').eq(i).addClass('active').siblings().removeClass('active');
        const offset = (this.defaultMinWidth + this.defaultGap) * i;
        const right = offset + this.itemWidth;
        this.target.find('.swiper-body').css({
            transform: right > this.target.width() ? `translateX(${-offset}px)` : 'none'
        });
        this.index = i;
        this.bindAutoplay();
    }
}

function bindSwiper() {
    const target = $('.novel-swiper');
    if (target.length === 0) {
        return;
    }
    new NovelSwiper(target as any);
}
function bindReader() {
    if ($('.reader-container').length === 0) {
        return;
    }
    const toggleFull = () => {
        $(document.body).toggleClass('reader-focus-mode', $win.width() < 480 || $win.height() < 480);
    };
    const settingModal = $('.setting-dialog').on('click', '.dialog-close', () => {
        settingModal.hide();
    });
    const $win = $(window).on('scroll', () => {
        $('.reader-sidebar .go-top').toggle($win.scrollTop() > 50);
    }).on('resize', toggleFull);
    $(document).on('keydown', e => {
        if (e.code === 'ArrowRight') {
            e.preventDefault();
            e.stopPropagation();
            $('.control-bar .next-item a').trigger('click');
            return;
        }
        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            e.stopPropagation();
            $('.control-bar .prev-item a').trigger('click');
            return;
        }
    });
    $('.reader-sidebar').on('click', '.go-top', () => {
        $win.scrollTop(0);
    }).on('click', '.do-setting', () => {
        settingModal.show();
    });
    toggleFull();
}

$(function() {
    bindSwiper();
    bindReader();
});