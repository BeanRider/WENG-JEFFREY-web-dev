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
            .when("/user/:uid/website", {
                templateURL: "views/website/website-list.view.client.html"
            })
            .when("/user/:uid/website/new", {
                templateURL: "views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
                templateURL: "views/website/website-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page", {
                templateURL: "views/page/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateURL: "views/page/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateURL: "views/page/page-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateURL: "views/widget/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateURL: "views/widget/widget-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateURL: "views/widget/widget-edit.view.client.html"
            });
    }
})();