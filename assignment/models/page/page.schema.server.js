module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website: { type: mongoose.Schema.Types.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "Widget"}],
        dateCreated: {type: Date, default: Date.now}

    }, {collection: "assignment.page"});
    return PageSchema;

};