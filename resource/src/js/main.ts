
$(function() {
    $('.tab-header-bar a').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $('.tab-target-body .tab-item').eq($this.index()).addClass('active').siblings().removeClass('active');
    });
    $(document).on('click', '.tree-box .tree-parent>.name', function() {
        $(this).closest('.tree-parent').toggleClass('open');
    });
    $('.navbar-icon').on('click', function(e) {
        e.preventDefault();
        $('.navbar').toggleClass('open');
    });
    $('.frame-resize a').on('click', function(e) {
        let $this = $(this);
        if ($this.attr('target')) {
            return;
        }
        e.preventDefault();
        $this.addClass('active').siblings().removeClass('active');
        const size = $this.text();
        let width = '100%';
        let height = '100vh';
        if (size.indexOf('x') > 0) {
            const s = size.split('x');
            width = s[0].trim() + 'px';
            height = s[1].trim() + 'px';
        }
        $('#main-frame').css({
            width,
            height
        });
    });
});
