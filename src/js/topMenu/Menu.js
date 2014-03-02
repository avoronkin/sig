var View = require('../core/views/View');
var template = require('./menu-template.html');
var rivets = require('rivets');

module.exports = View.extend({
    initialize: function (options) {},
    start: function () {
        this.render();
        this.listenTo(this.collection, 'add remove changed', this.render);

        return this;
    },
    tagName: 'ul',
    className: 'nav nav-tabs',
    template: template,
    data: function () {
        return {
            items: this.collection.toJSON()
        };
    },
    toString: function () {
        return 'MenuView';
    }
});
