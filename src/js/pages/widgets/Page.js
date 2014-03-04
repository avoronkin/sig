var Page = require('../../core/Page');
var Layout = require('./Layout');

module.exports = Page.extend({
    initialize: function (options) {
        this.set({
            'name': 'Widgets',
            'title': 'Widgets title',
            'route': '',
            'layout': {
                constructor: Layout
            }
        });
    }

});
