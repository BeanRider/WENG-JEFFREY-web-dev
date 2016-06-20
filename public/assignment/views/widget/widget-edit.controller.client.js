(function() {
    angular
       .module("WAMApp")
       .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $scope, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.back = back;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.widget = response.data;
                        if (vm.widget.name) {
                            vm.nameless = false;
                        } else {
                            vm.nameless = true;
                        }
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }
        init();

        function back() {
            if (vm.nameless) {
                $scope.editWidgetForm.$submitted = true;
                return;
            }
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function updateWidget() {
            if ($scope.editWidgetForm.$invalid) {
                $scope.editWidgetForm.$submitted = true;
                return;
            }

            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.success = "Widget update successful!";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.success = "Widget delete successful!";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }
    }
})();