// Contains all database operations using mongoose.
module.exports = function() {

    var mongoose = require("mongoose");
    
    var UserSchema = require("./user.schema.server.js")();

    // pass mongoose an instance of the mongoose Schema, in order to define a mongoose Model named "User":
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        // Asynchronous network communication to the mongodb
        return User.create(user);
    }

    function findUserById(userId) {
        // This is going to find by id, and return a single user, not an array.
        // Null if no matches.
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({
            username: username
        });
    }

    function findUserByCredentials(username, password) {
        return User.findOne({
            username: username,
            password: password
        });
    }

    function updateUser(userId, user) {
        return User.update(
            {_id: userId},
            {$set: user}
        );
    }

    function deleteUser(userId) {
        return User.findOneAndRemove({
            _id: userId
        });
    }
};