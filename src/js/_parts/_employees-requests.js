/*
 * employees-requests
 */

$(function($) {
  var allAccordions = $('.employees-requests__employee-row .employees-requests__acordion-content');
  var allAccordionItems = $('.employees-requests__employee-row .employees-requests__flexrow');
  $('.employees-requests__employee-row .employees-requests__flexrow').click(function() {
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
