(function() {
    angular
        .module("WAMApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {

        var vm = this;
        // put all event handlers at the top, just like variables
        vm.updateUser = updateUser;

        var id = $routeParams["uid"];
        var index = -1;
        // execute on load time.
        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if (result) {
                vm.success = "User successfully updated!"
            } else {
                vm.error ="User failed to update!"
            }
        }
    }
})();