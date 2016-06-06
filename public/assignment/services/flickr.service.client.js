(function() {
    angular
        .module("WAMApp")
        .factory("FlickrService", FlickrService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "e64628a256f3f126747a05c9da874d02";
            var secret = "7ecb5ad0a4e0721d";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);

            return $http.get(url);
        }
   }
})();