(function() {
    angular
        .module("WAMApp")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.newWebsite = newWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.website = {};
        }
        init();

        function newWebsite() {
            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }
    }
})();