(function() {

    angular
        .module("WAMApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateURL: "views/user/login.view.client.html"
            })
            .when("/", {
                templateURL: "views/user/login.view.client.html"
            })
            .when("default", {
                templateURL: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateURL: "views/user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateURL: "views/user/profile.view.client.html"
            })
    }

})