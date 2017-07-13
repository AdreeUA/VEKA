$(function(){
    $(document).on('click', '.js-inlineModal', function(event) {
        event.preventDefault();

        var src = $(this).data('mfp-src'),
            ajax = $(this).data('mfp-ajax') || 'inline';

        $.magnificPopup.open({
            items: {
                src: src,
                type: ajax
            },
            closeBtnInside: false,
            callbacks: {
                open: function() {
                    $('body').addClass('mfp-open');
                    headerMarginAdd();
                    $(window).trigger('scroll');
                },
                close: function(){
                    $('body').removeClass('mfp-open');
                    headerMarginRemove();
                }
            }
        });
    });

    $(document).on('click', '.js-mfp-close', function(){
        $.magnificPopup.close();
    });
});

function headerMarginAdd(){
    $('.header.is-sticky').css({
        'margin-right': ($(window).width() >= 768) ? scrollbarWidth() : 0
    });
}

function headerMarginRemove(){
    $('.header.is-sticky').css({
        'margin-right': '0'
    });
}