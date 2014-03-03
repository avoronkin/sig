var View = require('../../../../core/views/View');
var template = require('./sidebar-item.html');
var $ = require('jquery');
require('jquery.event.drag');

module.exports = View.extend({
    initialize: function () {
        // this.$el.data('cid', this.model.cid);
        // this.$el.data('type', 'table');
    },
    template: template,
    tagName: 'li',
    className: 'drag',
    data: function () {
        return this.model.toJSON();
    },
    afterRender: function () {
        var view = this;

        view.$el.drag("start", function () {
            view.clone = view.$el.clone().css({
                position: 'absolute',
                opacity: 0.75,
                width: view.$el.width(),
                height: view.$el.height()
            });
            return view.clone.appendTo(document.body);
        }).drag(function (ev, dd) {
            $(dd.proxy).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        },{
            // drop: '.node-drop' 
        }).drag("end", function (ev, dd) {
            $(dd.proxy).remove();
        });

    },

    remove: function(){
        $(this.clone).remove();
        View.prototype.remove.call(this); 
    }
});
