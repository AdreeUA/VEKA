/*
 * Helpers
 */
 
$(document).on('change input', '.js-numberOnly', function(){
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }

    return false;
});
 
equalheight = function(container){
    var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;

    $(container).each(function() {
        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } 
        else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(function(){
    var ua = window.navigator.userAgent.toLowerCase(),
        ie = (/trident/gi).test(ua) || (/msie/gi).test(ua) || (/Windows Phone/gi).test(ua) || (/Edge/gi).test(ua);

    if(ie){
        $('body').addClass('ie');
    }
});

function scrollbarWidth() {
    var block = $('<div>').css({'height':'50px','width':'50px'}),
        indicator = $('<div>').css({'height':'200px'});

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();    
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();
    return (w1 - w2);
}