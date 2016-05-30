// IFFE: anything in the function does not affect global fields,
// nor does the global fields affect the fields inside the function
(function() {
    angular
        .module("WAMApp", ["ngRoute"]);
})();