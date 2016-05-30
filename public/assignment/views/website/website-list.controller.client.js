(function() {
    angular
        .module("WAMApp")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            console.log(vm.userId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
        
    }
})();