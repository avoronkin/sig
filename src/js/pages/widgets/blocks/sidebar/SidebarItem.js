var View = require('../../../../core/views/View');
var mediator = require('../../../../core/mediator');
var template = require('./sidebar-item.html');
var $ = require('jquery');
require('jquery.event.drag');
var _ = require('underscore');

module.exports = View.extend({
    initialize: function () {
    },
    template: template,
    tagName: 'li',
    className: 'widget-template',
    data: function () {
        return this.model.toJSON();
    },
    afterRender: function () {
        var view = this;

        view.$el.drag("start", function (ev, dd) {
            view.clone = view.$el.clone().css({
                position: 'absolute',
                opacity: 0.75,
                width: view.$el.width(),
                height: view.$el.height()
            });

            return view.clone.appendTo(document.body);

        }).drag(function (ev, dd) {
            if (dd.drop.length) {
                // console.log('drag', dd.drop[0])
                _.once(function () {
                    $(dd.proxy).trigger('mouseup').remove();
                    // console.log('once')
                    mediator.trigger('widget:add', view.model);
                })();

            } else {
                $(dd.proxy).css({
                    top: dd.offsetY,
                    left: dd.offsetX
                });

            }
        }, {}).drag("end", function (ev, dd) {

            if (dd.drop.length) {} else {
                $(dd.proxy).remove();
            }
        });

    },

    remove: function () {
        $(this.clone).remove();
        View.prototype.remove.call(this);
    }
});
