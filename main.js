$(document).ready(function () {
    $('[date-picker]').pickdate();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({
        container: 'body',
        html:true,
        content: function() {
            return $(this).find('.popover').html();
        }
    });
});