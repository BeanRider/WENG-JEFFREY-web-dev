(function() {
    angular
        .module("WAMApp")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function(response) {
                        vm.websites = response.data;
                    }
                );
        }
        init();
        
    }
})();