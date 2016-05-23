angular
    .module("WAMApp", [])
    .controller("WAMController", WAMController);

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
