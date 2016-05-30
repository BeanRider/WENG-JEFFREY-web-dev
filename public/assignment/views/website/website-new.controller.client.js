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
            console.log(vm.userId);
        }
        init();

        function newWebsite() {
            // console.log(vm.website.name);
            if (vm.website == null) {
                vm.error = "A website must cannot be null!";
                return;
            } else if (vm.website.name == null) {
                vm.error = "A website must have a name!";
                return;
            }
            WebsiteService.createWebsite(vm.userId, vm.website);
            $location.url("/user/" + vm.userId + "/website");
        }

    }
})();