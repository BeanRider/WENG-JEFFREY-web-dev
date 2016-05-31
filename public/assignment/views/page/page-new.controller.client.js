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
            vm.page = {_id: "" + (new Date).getTime()};
        }
        init();

        function newPage() {
            if (vm.page.name == null || vm.page.name === "") {
                vm.error = "Must provide a page name!";
                return;
            }
            vm.error = null;
            PageService.createPage(vm.websiteId, vm.page);
            vm.succcess = "New Page added!";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

})();