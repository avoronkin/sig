var BaseView = require('../core/views/BaseView');
var template = require('./menu-template.html');
var rivets = require('rivets');

console.log('rivets', rivets);
module.exports = BaseView.extend({
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
