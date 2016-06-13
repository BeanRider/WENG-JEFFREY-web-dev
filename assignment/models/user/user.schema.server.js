// Create a mongoose Schema that defines what is a user
module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, sparse: true},
        lastName: {type: String, sparse: true},
        email: {type: String, sparse: true},
        phone: {type: String, sparse: true},
        websites: Array,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "assignment.user"});

    return UserSchema;
};