var View = require('../../../../core/views/View');
var template = require('./tr.html');
var $ = require('jquery');
require('jquery.event.drag');

module.exports = View.extend({
    initialize: function () {
        this.$el.data('cid', this.model.cid);
        this.$el.data('type', 'table');
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
        console.log('tr after render')
        var view = this;

        view.$el.drag("start", function () {
            view.clone = view.$el.clone().css({
                position: 'absolute',
                opacity: 0.75,
                width: view.$el.width(),
                height: view.$el.height()
            });
            return view.clone.appendTo(document.body);
        }).drag(function (ev, dd) {
            $(dd.proxy).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        },{
            drop: '.node-drop' 
        }).drag("end", function (ev, dd) {
            $(dd.proxy).remove();
        });

    },

    remove: function(){
        $(this.clone).remove();
        View.prototype.remove.call(this); 
    }
});
