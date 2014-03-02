var LayoutView = require('../../core/views/LayoutView');
var template = require('./layout.html');

module.exports = LayoutView.extend({
    initialize: function () {
        this.keepEl = true;
    },
    template: template
});
