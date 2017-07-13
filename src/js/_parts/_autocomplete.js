/*
 * Autocomplete
 */

$(function(){
    $('.js-autocomplete').each(function(){
        var _this = $(this);

        _this.autocomplete({
            source: _this.data('ajax'),
            minLength: 2,
            select: function(event, ui) {
                
            }
        });
    });
});
