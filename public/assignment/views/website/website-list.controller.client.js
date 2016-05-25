(function() {
    angular
        .module("WAMApp")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams["uid"];
            console.log(userId);
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();

    }
})();