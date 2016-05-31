(function() {
    angular
       .module("WAMApp")
       .controller("PageListController", PageListController);

    function PageListController($routeParams, $location, PageService) {

        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

})();