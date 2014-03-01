var BaseView = require('../../../../core/views/BaseView');
var template = require('./tr.html');
var $ = require('jquery');
require('jquery.event.drag');

module.exports = BaseView.extend({
    initialize: function(){
    },
    template: template,
    tagName: 'tr',
    className: 'drag',
    events: {
        'click .edit': 'onClickEdit',
        'click .delete': 'onClickDelete',
    },
    onClickEdit: function () {
        console.log('click edit', this.cid);
        this.setState('edit');
    },
    onClickDelete: function () {
        this.model.collection.remove(this.model);
    },
    setState: function (state) {
        this.model.set('state', state);
    },
    data: function () {
        return this.model.toJSON();
    },
    afterRender: function () {
        this.$el.data('cid', this.model.cid); 
        var view = this;

        view.$el.drag("start", function () {
            var clone = view.$el.clone();
            clone.css({
                position:'absolute',
                opacity:0.75,
                width: view.$el.width(),
                height: view.$el.height()
            });
            // console.log('drug start', clone);
            return clone.appendTo(document.body);
        }).drag(function (ev, dd) {
            // console.log('proxy', dd.proxy)
            $(dd.proxy).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        }).drag("end", function (ev, dd) {
                // console.log('drag end', dd)
                if(dd.drop.length){
                    view.model.collection.remove(view.model);
                    // console.log('dropped') 
                }

                $(dd.proxy).remove();
            });

    }
});
