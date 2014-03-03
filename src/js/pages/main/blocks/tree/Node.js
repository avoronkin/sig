var ListView = require('../../../../core/views/ListView');
var View = require('../../../../core/views/View');
var template = require('./node.html');
var _ = require('underscore');
var $ = require('jquery');
require('jquery.event.drag');
require('jquery.event.drop');
var mediator = require('../../../../core/mediator');

var Node = ListView.extend({
    template: template,
    events: {
        'click': 'toggleState'
    },
    tagName: 'li',
    initialize: function (options) {
        this.options = options;
        this.options.containerSelector = '.children';
        this.itemView = Node;
        this.model.set('collapsed', false);
        this.listenTo(this.model, 'change', function (model) {
            this.render();
            console.log('model changed', model.toJSON())

        })
    },

    toggleState: function (event) {
        event.stopPropagation();
        // console.log('ttttttttt', this.model.get('collapsed'))
        this.model.set('collapsed', !this.model.get('collapsed')); // !this.model.get('collapsed'));
    },

    getItems: function () {
        var itemName = this.model.get('name');
        var items = this.collection.filter(function (model) {
            return itemName === model.get('parentName');
        });

        return items;
    },

    data: function () {
        return _.extend(this.model.toJSON(), {
            hasChildren: this.model.hasChildren()
        });
    },

    afterRender: function () {
        console.log('node after render')
        var self = this;
        this.$el.find('.node-drag').data('cid', this.model.cid);
        this.$el.find('.node-drag').data('type', 'tree');

        this.$el.find('.node-drag').first().drag("start", function () {
            self.clone = self.$el.find('.node-drag').first().clone().css({
                position: 'absolute',
                opacity: 0.75,
                width: self.$el.width(),
                height: self.$el.height()
            });
            return self.clone.appendTo(document.body);
        }).drag(function (ev, dd) {
            $(dd.proxy).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        }, {
            distance: 5,
        }).drag("end", function (ev, dd) {
            $(dd.proxy).remove();
        });


        this.$el.find('.node-drop').drop(function (ev, dd) {
            var dragCid = $(dd.drag).data('cid');
            var dragCollectionType = $(dd.drag).data('type');
            var dropCid = self.model.cid;
            var dropCollectionType = 'tree';

            console.log('drop', dragCid, dragCollectionType, dd);

            if (dragCollectionType === 'table') {
                mediator.trigger('moveTrToNode', dragCid, dropCid);
            }
            if (dragCollectionType === 'tree') {
                mediator.trigger('moveNodeToNode', dragCid, dropCid);
            }

        }).drop("start", function () {
            $(this).addClass("drop-active");
        }).drop("end", function () {
            $(this).removeClass("drop-active");
        });
    },
    remove: function () {
        $(this.clone).remove();
        ListView.prototype.remove.call(this);
    },

    toString: function () {
        return 'Node';
    }
});

module.exports = Node;
