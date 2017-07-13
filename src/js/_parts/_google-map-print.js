// printAnyMaps :: _ -> HTML
function printAnyMaps() {
    var $body = $('body');
    var $mapContainer = $('#map');
    var $mapContainerParent = $mapContainer.parent();
    var $printContainer = $('<div style="position:relative; left: -600px;">');

    $printContainer
        .height($mapContainerParent.height())
        .append($mapContainer)
        .prependTo($body);

    var $content = $body
        .children()
        .not($printContainer)
        .not('script')
        .detach();

    /**
    * Needed for those who use Bootstrap 3.x, because some of
    * its `@media print` styles ain't play nicely when printing.
    */
    var $patchedStyle = $('<style media="print">')
        .text(
          'img { max-width: none !important; }' +
          'a[href]:after { content: ""; }'
        )
        .appendTo('head');

    window.print();

    $body.prepend($content);
    $mapContainerParent.prepend($mapContainer);

    $printContainer.remove();
    $patchedStyle.remove();
}

$(document).on('click', '.js-printMapLink', function(){
    printAnyMaps();
});