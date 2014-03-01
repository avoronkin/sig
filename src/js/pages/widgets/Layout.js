var BaseView = require('../../core/views/BaseView');
var template = require('./layout.html');

module.exports = BaseView.extend({
    initialize: function () {
        this.keepEl = true;
    },
    template: template
});
