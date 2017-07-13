/*
 * employees-requests
 */

$(function($) {
  var allAccordions = $('.employees__employee-row > .employees__acordion-content');
  var allAccordionItems = $('.employees__employee-row > .employees__flexrow');
  $('.employees__employee-row > .employees__flexrow').click(function() {
    if($(this).hasClass('open'))
    {
      $(this).removeClass('open');
      $(this).next().slideUp("slow");
    }
    else
    {
	    allAccordions.slideUp("slow");
	    allAccordionItems.removeClass('open');
	    $(this).addClass('open');
	    $(this).next().slideDown("slow");
	    return false;
    }
  });
});
