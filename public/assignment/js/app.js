// IFFE: anything in the function does not affect global fields,
// nor does the global fields affect the fields inside the function

(function() {
    angular
        .module("WAMApp", ["ngRoute"])
        .controller("WAMController");

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

})();
