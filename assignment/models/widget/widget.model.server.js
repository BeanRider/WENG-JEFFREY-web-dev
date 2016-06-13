module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget:          createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById:        findWidgetById,
        updateWidget:          updateWidget,
        deleteWidget:          deleteWidget,
        reorderWidget:         reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;

        return Widget.find(pageId)
            .then(
                function(widgets) {
                    console.log("Success: " + widgets);
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function(error) {
                    console.log("Error: ");
                    return null;
                }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({
            _page: pageId
        });
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {$set: widget}
        );
    }

    function deleteWidget(widgetId) {
        return Widget.findOneAndRemove({
            _id: widgetId
        });
    }

    /**
     * Modifies the order of widget at position start into final position end in page whose _id is pageId
     */
    function reorderWidget(pageId, start, end) {
        console.log("Page id:" + pageId);
        console.log("start:" + start);
        console.log("end:" + end);
        return Widget.find(
            function(err, widgets){
                widgets.forEach(
                    function(widget){
                        if (widget._page.equals(pageId)) {
                            if(start < end) {
                                if(widget.order > start && widget.order <= end) {
                                    widget.order--;
                                    widget.save();
                                } else if(widget.order === start) {
                                    widget.order = end;
                                    widget.save();
                                }
                            } else if (start > end) {
                                if(end <= widget.order && widget.order < start) {
                                    widget.order++;
                                    widget.save();
                                } else if(widget.order === start) {
                                    widget.order = end;
                                    widget.save();
                                }
                            } else {
                                // DO NOTHING
                            }
                        }
                    });
        });
    }

};