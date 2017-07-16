$(function($) {

    if ($('.setting-price__table').length) {

        var $table = $('.setting-price__table'),
            $tableSticky = $('.setting-price__table-sticky'),
            $changePriceBtn = $('.js-change-price'),
            $inputs = $('.setting-price__price-input'),
            $allSettingsPrice = $('.setting-price__price'),
            tablePos = $table.offset().top,
            isReady = true;

        $(window).scroll(function(){

            var winScrollTop = $(this).scrollTop();

            if (winScrollTop > tablePos){


                if (isReady) {
                    var cloneTableHead = $table.find('thead').clone(),
                        isHeaderSticky = $('.header').hasClass('is-sticky');

                    $tableSticky.html(cloneTableHead);
                    $tableSticky.addClass('is-show');
                    $tableSticky.width($table.width());
                    isHeaderSticky && $tableSticky.addClass('header-sticky');

                    setTimeout(function () {
                        $tableSticky.addClass('is-sticky');
                    }, 20);

                    isReady = false;

                }

            } else {
                $tableSticky.removeClass('is-show is-sticky header-sticky');
                $tableSticky.find('thead').remove();

                isReady = true;
            }

        });

        $changePriceBtn.click(function (e) {
            e.preventDefault();
            $table.toggleClass('setting-price__table_edit-all')
        });

        $table.on('click', function (e) {

            $allSettingsPrice.removeClass('setting-price__price_edit');

            if ($(e.target).closest('.setting-price__price').length) {

                var $settingsPrice = $(e.target).closest('.setting-price__price'),
                    $input = $settingsPrice.find('.setting-price__price-input'),
                    inputValue = $input.val();

                $settingsPrice.addClass('setting-price__price_edit');

                if ($(e.target).is('.setting-price__save')) {
                    var value = $settingsPrice
                            .find('.setting-price__price-input')
                            .val(),
                        $inputPlaceholder = $settingsPrice
                            .find('.setting-price__input-value');

                    $settingsPrice.removeClass('setting-price__price_edit');
                    $inputPlaceholder.text(value)

                    if (!value) {

                        $settingsPrice.addClass('setting-price__price_empty');
                        $inputPlaceholder.text('Не указано')

                    }

                }

                if (!inputValue) {
                    $settingsPrice.addClass('setting-price__price_empty')
                } else {
                    $settingsPrice.removeClass('setting-price__price_empty')
                }
            }


        });

        $inputs.each(function () {
            var $this = $(this);

            $this.keydown(function(e){

                if (e.keyCode === 13) {
                    $this
                        .closest('.setting-price__price')
                        .removeClass('setting-price__price_edit')
                        .blur();

                    $this
                        .siblings('.setting-price__input-value')
                        .text($this.val());
                }

            });
        });

        $inputs.on('change', function () {
            var $this = $(this),
                value = $this.val(),
                $parent = $this.closest('.setting-price__price'),
                $inputPlaceholder = $this.siblings('.setting-price__input-value');

            if (!$.isNumeric(value) ) {
                $this.val('')
            }

            if (!value) {

                $parent.addClass('setting-price__price_empty')
                $inputPlaceholder.text('Не указано')

            } else {

                $parent.removeClass('setting-price__price_empty')

            }
        });

        $inputs.on('focus', function () {

            var $this = $(this),
                $parent = $this.closest('.setting-price__price');

            if ($parent.hasClass('setting-price__price_empty')) {
                $parent.removeClass('setting-price__price_empty')
            }

        })

        $inputs.on('blur', function () {

            var $this = $(this),
                $parent = $this.closest('.setting-price__price'),
                value = $this.val();

            if (!value) {
                $parent.addClass('setting-price__price_empty')
            }

        })

        $table.on('click', '.js-delete-region', function () {
            var $this = $(this),
                $regionDataAll = $table.find('[data-region]'),
                currentValueRegionData = $this.closest('[data-region]').attr('data-region'),
                result = confirm('Вы уверены');


            if (result) {
                $('[data-region='+ currentValueRegionData + ']').remove()
            }
        });


    }

});
