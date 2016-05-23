angular
    .module("WAM_App", [])
    .controller("WAM_Controller", WAM_Controller);

var showingCard = true;
$('.jw-card-toggle').change(function() {
    showingCard = !showingCard;
    if (showingCard) {
        $('.jw-card-group').show();
        $('.jw-list-group').hide();

    } else {
        $('.jw-card-group').hide();
        $('.jw-list-group').show();
    }
});
