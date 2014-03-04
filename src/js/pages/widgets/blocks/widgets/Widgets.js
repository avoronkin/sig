var ListView = require('../../../../core/views/ListView');
var template = require('./widgets.html');
var $ = require('jquery');
require('jquery.event.drop');
require('jquery.gridster');
var mediator = require('../../../../core/mediator');
var _ = require('underscore');
var Widget = require('./Widget');

module.exports = ListView.extend({
    itemView: Widget,
    template: template,
    initialize: function (options) {
        this.options = options;
        this.keepEl = true;
        mediator.on('widget:add', this.renderListItem, this);
        mediator.on('widget:remove', this.removeWidget, this);
    },

    removeWidget: function (view) {
        this.gridster.remove_widget(view.el)
        view.remove();
        this._views[view];
    },
    renderList: function () {
        this.removeList();
        // console.log('renderList')
        var items = this.getItems();

        _(items).each(this.renderListItem, this);

    },

    renderListItem: function (model) {
        _.extend(this.itemViewOptions, {
            model: model,
            collection: this.collection
        });

        var view = new this.itemView(this.itemViewOptions);

        this._views.push(view);

        view.render();

        this.gridster.add_widget(view.$el, view.model.get('size_x'), view.model.get('size_y'));
    },


    afterRender: function () {
        var self = this;

        this.$el.find('ul').drop(function (ev, dd) {
            // console.log('drop', ev, dd);
        }).drop("start", function (ev, dd) {
            $(this).addClass("drop-active");
        }).drop("end", function () {
            $(this).removeClass("drop-active");
        });

        this.gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [100, 55],
            max_cols: 9,
            min_cols: 9,
            helper: 'clone',
            draggable: {
                handle: 'header'
            },
            resize: {
                enabled: true
            }
        }).data('gridster');

    }
});
