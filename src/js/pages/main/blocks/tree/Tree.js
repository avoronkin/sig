var BaseView = require('../../../../core/views/BaseView');
var mediator = require('../../../../core/mediator');
var template = require('./tree.html');
var $ = require('jquery');
require('jquery.event.drop');


module.exports = BaseView.extend({
    template: template,
    afterRender: function () {
        console.log('afterRender tree', this)
        this.$el.find('.tree-drop').drop(function (ev, dd) {
            var cid = $(dd.drag).data('cid');
            mediator.trigger('table:remove', cid);
            console.log('drop', cid, ev, dd);
            $(this).toggleClass('dropped');
        });
    }
});
