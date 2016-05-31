(function() {

    angular
        .module("WAMApp")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websiteId = $routeParams["wid"];
            vm.userId = $routeParams["uid"];
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite() {
            if (!WebsiteService.deleteWebsite(vm.website._id)) {
                vm.error = "Failed to delete website!";
                return;
            }
            vm.error = null;
            vm.success = "Website delete successful!";
            $location.url("/user/" + vm.userId +"/website");
        }

        function updateWebsite() {
            if (vm.website.name === "" || vm.website.name == null ) {
                vm.error = "Website name cannot be empty!";
                return;
            }
            WebsiteService.updateWebsite(vm.website._id, vm.website);
            vm.error = null;
            vm.success = "Website update successful!";
            $location.url("/user/" + vm.userId +"/website");
        }

    }
})();