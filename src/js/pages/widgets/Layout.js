var LayoutView = require('../../core/views/LayoutView');
var template = require('./layout.html');
var Sidebar = require('./blocks/sidebar/Sidebar');
var Widgets = require('./blocks/widgets/Widgets');
var Backbone = require('backbone');

var widgetsTemplates = new Backbone.Collection([{
    name: 'Виджет 1',
    size_x: 3,
    size_y: 3,
    col: 1,
    row: 1,
    dataLabel: 'Источник 2',
    dataShowLines: true,
    dataShowPoints: false,
    color: '#EE164C',
    totalPoints: 30,
    type: 'test'
}, {
    name: 'Виджет 2',
    size_x: 2,
    size_y: 2,
    col: 1,
    dataLabel: 'Источник 1',
    dataShowLines: true,
    dataShowPoints: true,
    color: '#56AC12',
    row: 1,
    totalPoints: 50,
    type: 'test'
}]);

var widgets = new Backbone.Collection([{
    name: 'Виджет 1',
    size_x: 3,
    size_y: 3,
    col: 1,
    row: 1,
    dataLabel: 'Источник 1',
    dataShowLines: true,
    dataShowPoints: false,
    totalPoints: 50,
    color: '#399cc'
}]);

module.exports = LayoutView.extend({
    initialize: function () {
        this.keepEl = true;

        this.views = {
            '#sidebar': {
                constructor: Sidebar,
                options: {
                    collection: widgetsTemplates
                }
            },
            '#widgets': {
                constructor: Widgets,
                options: {
                    containerSelector: '.list',
                    collection: widgets
                }
            },

        };

    },
    template: template
});
