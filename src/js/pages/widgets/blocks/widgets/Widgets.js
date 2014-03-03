var View = require('../../../../core/views/View');
var template = require('./widgets.html');
var $ = require('jquery');
// require('jquery.event.drag');
require('jquery.gridster');

module.exports = View.extend({
    initialize: function () {
        this.keepEl = true;
    },
    template: template,
    // data: function () {
    //     return this.model.toJSON();
    // },
    afterRender: function () {
        var view = this;

    },

});
