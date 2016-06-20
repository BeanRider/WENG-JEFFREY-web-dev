(function() {

    angular
        .module("WAMApp")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $scope, $location, PageService) {

        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                        vm.page = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        init();

        function updatePage() {
            if ($scope.editPageForm.$invalid) {
                $scope.editPageForm.$submitted = true;
                return;
            }

            PageService
                .updatePage(vm.pageId, vm.page)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.success = "Page updated!";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.succcess = null;
                        vm.error = error.data;
                    }
                );
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.succcess = "Page deleted!";
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