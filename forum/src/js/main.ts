$(function() {
    $(document).on('click', '.dropdown-container .dropdown-control', function() {
        const $this = $(this);
        const box = $this.closest('.dropdown-container');
        const toggle = box.hasClass('popup-open');
        if (!toggle) {
            $('.dropdown-container').removeClass('popup-open');
        }
        box.toggleClass('popup-open', !toggle);
        $('.user-popup').removeClass('popup-open');
    }).on('click', '.user-control-icon', function(e) {
        e.preventDefault();
        const $this = $(this);
        const pos = $this.offset();
        $('.user-popup').addClass('popup-open').css({
            left: pos.left - 80 + 'px',
            top: pos.top + 40 + 'px',
        });
    }).on('click', '.command-bar .command-control-icon', function() {
        $(this).closest('.command-bar').toggleClass('popup-open');
    }).on('click', '.header .search-bar .search-control-icon', function() {
        $(this).closest('.header').toggleClass('search-toggle-mode');
    });
});