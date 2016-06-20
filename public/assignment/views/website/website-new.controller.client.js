(function() {
    angular
        .module("WAMApp")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $scope, $routeParams, WebsiteService) {
        var vm = this;
        vm.newWebsite = newWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.website = {};
        }
        init();

        function newWebsite() {
            if ($scope.newWebsiteForm.$invalid) {
                $scope.newWebsiteForm.$submitted = true;
                return;
            }
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