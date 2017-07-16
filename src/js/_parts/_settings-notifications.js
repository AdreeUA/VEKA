$(function($) {
   var $checkboxAll = $('.js-checkbox-all');

    $checkboxAll.click(function () {
        var $this = $(this).find('input'),
            checked = $this.prop('checked'),
            $checkboxs = $this
                .closest('.settings__content')
                .find('.settings-notifications')
                .find('input[type="checkbox"]');

        console.log('---', checked);

        $checkboxs.each(function () {
            $(this).prop('checked', checked)
        })
    })
});