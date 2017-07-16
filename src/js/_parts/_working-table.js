$(function($) {
    var $tablesWrap = $('.working-table'),
        $select = $tablesWrap.find('select'),
        $checkbox = $tablesWrap.find('.working-table__checkbox-field input[type="checkbox"]');

    function changeCheckboxHandler() {
        var $this = $(this),
            checked = $this.is(':checked'),
            siblingTimes = $this.siblings('.working-table__edit-times'),
            workTimeText = $this.closest('th').find('.working-table__time');

        if (!checked) {
            siblingTimes.slideUp();
            // workTimeText.addClass('working-table__time_off')

        } else {
            siblingTimes.slideDown();
            // workTimeText.removeClass('working-table__time_off')
        }
    }

    $checkbox.on('change', changeCheckboxHandler);

    $tablesWrap.on('click', '.working-table__edit', function (e) {
        e.preventDefault();
        $(this)
            .closest('.working-table')
            .addClass('working-table_open')
            // .removeClass('working-table_empty');
    });

    $tablesWrap.on('click', '.js-cancel', function (e) {
        e.preventDefault();
        $(this)
            .closest('.working-table')
            .removeClass('working-table_open');
    })
});
