(function() {
    angular
       .module("WAMApp")
       .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
        }
        init();

        function createWidget(type) {
            var newWidget = {
                type: type
            };
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + response.data._id);
                    },
                    function(error) {
                        
                    }
                );
        }
    }
})();