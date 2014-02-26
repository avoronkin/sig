var Page = require('../core/Page');

module.exports = Page.extend({
    initialize: function (options) {
        this.set({
            'name': 'Widgets',
            'title': 'Widgets title',
            'route': 'widgets'
        });
    }

});
