(function() {

    angular
        .module("WAMApp")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $scope, $location, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websiteId = $routeParams["wid"];
            vm.userId = $routeParams["uid"];
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function(response) {
                        vm.website = response.data;
                    }
                );
        }
        init();

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.website._id)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.success = "Website delete successful!";
                        $location.url("/user/" + vm.userId +"/website");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }

        function updateWebsite() {

            if ($scope.editWebsiteForm.$invalid) {
                $scope.editWebsiteForm.$submitted = true;
                return;
            }

            WebsiteService
                .updateWebsite(vm.website._id, vm.website)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.success = "Website update successful!";
                        $location.url("/user/" + vm.userId +"/website");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    });
        }
    }
})();