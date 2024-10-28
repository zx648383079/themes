function timeline() {
    const box = $(".timeline-container");
    if (box.length === 0) {
        return;
    }
    const itemWidth = 320;//box.children().width();
    box.width(box.children().length * itemWidth);
}

$(function() {
    timeline();
    $(document).on('click', '.star-control-bar i', function() {
        
    });
    
});