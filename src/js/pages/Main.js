var Page = require('../core/Page');

module.exports = Page.extend({
    initialize: function (options) {
        this.set({
            'name': 'Home',
            'title': 'Home title',
            'route': ''
        });
    }
});
