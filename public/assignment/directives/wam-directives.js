(function() {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find('.sortable-widgets')
                .sortable({
                    start: function (event, ui) {
                        console.log("sorting began!");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped!");
                        endIndex = ui.item.index();
                        console.log(endIndex);
                        console.log(data);
                        var sortedElement = data.widgets.splice(startIndex, 1);
                        console.log(sortedElement);
                        data.widgets.splice(endIndex, 0, sortedElement);

                        // Notify angular that the model as been changed,
                        // and any other dependents will be notified, and be re-rendered
                        scope.$apply();

                        // Tell the controller to perform new action.
                        data.sort(startIndex, endIndex);
                    }
                });
        }
        return {
            templateUrl: "views/widget/widget-list-orderer.view.client.html",
            scope: {
                data:    "="
            },
            link: linker
        };
    }
})();

