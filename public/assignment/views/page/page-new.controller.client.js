(function() {

    angular
        .module("WAMApp")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {

        var vm = this;
        vm.newPage = newPage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.page = {};
        }
        init();

        function newPage() {
            PageService
                .createPage(vm.websiteId, vm.page)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.succcess = "New Page added!";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }
    }

})();