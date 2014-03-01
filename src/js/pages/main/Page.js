var Page = require('../../core/Page');
var Layout = require('./Layout');

module.exports = Page.extend({
    initialize: function (options) {
        this.set({
            'name': 'Home',
            'title': 'Home title',
            'route': '',
            'layout': {
                constructor: Layout 
            }
        });
    }
});
