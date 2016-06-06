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

        /*
         var newWidget = {
         _id: (new Date()).getTime(),
         widgetType: type,
         pageId: vm.pid
         }

         switch (type) {
         case 'HEADER':
         newWidget.size = vm.widget.size;
         newWidget.text = vm.widget.text;
         break;
         case 'IMAGE':
         newWidget.width = vm.widget.width;
         newWidget.url = vm.widget.url;
         break;
         case 'YOUTUBE':
         newWidget.width = vm.widget.width;
         newWidget.url = vm.widget.url;
         break;
         }
         WidgetService.createWidget(newWidget);
         */

        function createWidget(type) {
            var newWidget = {
                widgetType: type,
            }
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
})()