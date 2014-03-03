var ListView = require('../../../../core/views/ListView');
var SidebarItem = require('./SidebarItem');
var template = require('./sidebar.html');

module.exports = ListView.extend({
    template: template,

    itemView: SidebarItem,

    initialize: function (options) {
        this.options = options;
    },

    getItems: function () {
        return this.collection.models;
    },

    toString: function () {
        return 'Sidebar';
    }
});
