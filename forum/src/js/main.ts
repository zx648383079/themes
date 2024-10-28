$(function() {
    $(document).on('click', '.dropdown-container .dropdown-control', function() {
        const $this = $(this);
        const box = $this.closest('.dropdown-container');
        const toggle = box.hasClass('popup-open');
        if (!toggle) {
            $('.dropdown-container').removeClass('popup-open');
        }
        box.toggleClass('popup-open', !toggle);
    });
});