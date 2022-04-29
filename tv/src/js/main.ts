
const screenFull = function() {
    const fnMap = [
        [
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror'
        ],
        // New WebKit
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
    
        ],
        // Old WebKit
        [
            'webkitRequestFullScreen',
            'webkitCancelFullScreen',
            'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
    
        ],
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror'
        ],
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError'
        ]
    ];
    
    for (const item of fnMap) {
        if (item && item[1] in document) {
            return item;
        }
    }
    return false;
}();
$(function() {
    bindBanner();
    bindCat();
    bindMovie();
    bindSearch();
    bindPlayer();
});

function bindBanner() {
    $('.banner-floor .recommend-item').on('mouseover', function() {
        const $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
    }).eq(0).trigger('mouseover');
}

function bindCat() {
    $('.category-floor .cat-item').on('mouseover', function() {
        const $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
    });
}

function bindMovie() {
    $('.movie-item').on('mouseover', function() {
        const $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
    }).on('mouseleave', function() {
        const $this = $(this);
        $this.removeClass('active');
    });
}

function bindSearch() {
    $('.search-bar').on('focus', 'input', function() {
        $(this).closest('.search-bar').addClass('focus');
    }).on('blur', 'input', function() {
        $(this).closest('.search-bar').removeClass('focus');
    });
}

function bindPlayer() {
    const box = $('.play-container');
    if (box.length < 1) {
        return;
    }
    const fullBtn = box.find('.full-icon');
    const volumeBtn = box.find('.volume-icon');
    const catalogPanel = box.find('.play-catalog');
    const toggelFull = (full: boolean) => {
        if (full) {
            box.addClass('play-full');
            fullBtn.addClass('fa-minimize').removeClass('fa-maximize');
            fullScreen();
        } else {
            box.removeClass('play-full');
            fullBtn.addClass('fa-maximize').removeClass('fa-minimize');
            exitFullscreen();
        }
    };
    const toggleVolume = (volume: number) => {
        volumeBtn.toggleClass('fa-volume-high', volume >= 70);
        volumeBtn.toggleClass('fa-volume-low', volume < 70 && volume > 0);
        volumeBtn.toggleClass('fa-volume-off', volume == 0);
        volumeBtn.toggleClass('fa-volume-xmark', volume < 0);
    };
    const fullScreen = (element: any = document.documentElement) => {
        if (!screenFull) {
            return;
        }
        element[screenFull[0]]();
    };
    const exitFullscreen = (element: any = document) => {
        if (!screenFull) {
            return;
        }
        element[screenFull[1]]();
    };
    const checkFull = (): boolean => {
        return screenFull && Boolean(document[screenFull[2]]);
    }
    box.on('click', '.back-btn', function() {
        history.back();
    }).on('click', '.full-icon', function() {
        toggelFull(!box.hasClass('play-full'));
    }).on('click', '.catalog-icon', function() {
        catalogPanel.toggle();
    }).on('click', '.volume-icon', function() {
        box.find('.volume-dialog').toggle();
    });
    if (screenFull) {
        document.addEventListener(screenFull[4], () => {
            toggelFull(!checkFull());
        });
    }
    let moveProgress: JQuery|undefined;
    $('.progress-bar').on('click', function(event) {
        const $this = $(this);
        const offset = event.clientX - $this.offset().left;
        $this.find('.progress-inner').css('width', offset * 100 / $this.width() + '%');
    }).on('mousedown', function(event) {
        const $this = $(this);
        const offset = event.clientX - $this.offset().left;
        const innerWidth = $this.find('.progress-inner').width();
        if (Math.abs(offset - innerWidth) < 3) {
            moveProgress = $this;
        }
    });
    $(document).on('mousemove', function(event) {
        if (!moveProgress) {
            return;
        }
        const offset = event.clientX - moveProgress.offset().left;
        moveProgress.find('.progress-inner').css('width', Math.max(Math.min(offset * 100 / moveProgress.width(), 100), 0) + '%');
    }).on('mouseup', function() {
        moveProgress = undefined;
    });
}