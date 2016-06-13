module.exports = function() {

    var mongoose = require("mongoose");

    var widgetTypes = "HEADING IMAGE YOUTUBE HTML INPUT".split(" ");

    console.log(widgetTypes);
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: "Page"},
        type: {type: String, enum: widgetTypes},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        order: Number,
        class: {type: String, default: "col-xs-12"},
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});
    return WidgetSchema;

};