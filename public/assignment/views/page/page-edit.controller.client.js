(function() {

    angular
        .module("WAMApp")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {

        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.page = PageService.findPageById(vm.pageId);

        }
        init();

        function updatePage() {
            if (vm.page.name == null || vm.page.name === "") {
                vm.error = "Must provide a page name!";
                return;
            }
            vm.error = null;
            PageService.updatePage(vm.pageId, vm.page);
            vm.succcess = "Page updated!";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function deletePage() {
            if (!PageService.deletePage(vm.pageId)) {
                vm.error = "Delete page failed!";
            }
            vm.error = null;
            vm.succcess = "Page deleted!";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

})();