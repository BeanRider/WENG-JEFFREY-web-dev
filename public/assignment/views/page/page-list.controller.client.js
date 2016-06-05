(function() {
    angular
       .module("WAMApp")
       .controller("PageListController", PageListController);

    function PageListController($routeParams, $location, PageService) {

        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.pages = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        init();
    }

})();