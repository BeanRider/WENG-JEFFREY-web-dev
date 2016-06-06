(function() {
    angular
       .module("WAMApp")
       .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService) {
        console.log("reach");
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.photos = [];

            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];

            WidgetService
                .findWidgetById($routeParams["wgid"])
                .then(
                    function(response) {
                        vm.error = null;
                        vm.widget = response.data;
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }
        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        var data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);

                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg"

            vm.widget.url = url;

            WidgetService
                .updateWidget(vm.widget._id, vm.widget)
                .then(
                    function(response) {
                        console.log("Image URL successfully updated!");
                    },
                    function(error) {
                        console.log("Image URL failed to update!");
                    }
                );
        }
    }
})()