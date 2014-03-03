var LayoutView = require('../../core/views/LayoutView');
var template = require('./layout.html');
var Sidebar = require('./blocks/sidebar/Sidebar');
var Widgets = require('./blocks/widgets/Widgets');
var Backbone = require('backbone');

var sidebarItems = new Backbone.Collection([{
    name: 'ttest',
    type: 'test'
},{
    name: 'ttest',
    type: 'test'
}]);

module.exports = LayoutView.extend({
    initialize: function () {
        this.keepEl = true;

        this.views = {
            '#sidebar': {
                constructor: Sidebar,
                options: {
                    collection: sidebarItems
                }
            },
            '#widgets': {
                constructor: Widgets,
                options: {
                }
            },

        };

    },
    template: template
});
