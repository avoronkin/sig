var View = require('../../../../core/views/View');
var template = require('./sidebar-item.html');
var $ = require('jquery');
require('jquery.event.drag');
var _ = require('underscore');

module.exports = View.extend({
    initialize: function () {
        // this.$el.data('cid', this.model.cid);
        // this.$el.data('type', 'table');
    },
    template: template,
    tagName: 'li',
    className: 'drag',
    data: function () {
        return this.model.toJSON();
    },
    afterRender: function () {
        var view = this;

        view.$el.drag("start", function (ev, dd) {
            console.log('drag start', arguments);
            view.clone = view.$el.clone().css({
                position: 'absolute',
                opacity: 0.75,
                width: view.$el.width(),
                height: view.$el.height()
            });
            
            return view.clone.appendTo(document.body);
            // return gridster.add_widget('<li>ewyewueiwue</li>').css({
            //     top: dd.offsetY,
            //     left: dd.offsetX
            // });

        }).drag(function (ev, dd) {
            if(dd.drop.length){
                console.log('drag', dd.drop[0])
                // $(dd.proxy).appendTo($(dd.drop[0])) 
                _.once(function(){
                    console.log('once')
                    dd.proxy = gridster.add_widget($(dd.proxy)).trigger('mouseup').removeAttr('style').css({
                        width: 320,
                        height: 185
                    },3,3,1,1)
                    dd.proxy = gridster.resize_widget(dd.proxy, 3,3);
                })();

            }else{
                $(dd.proxy).css({
                    top: dd.offsetY,
                    left: dd.offsetX
                });
            
            }
        },{
            // drop: '.node-drop' 
        }).drag("end", function (ev, dd) {

            if(dd.drop.length){

            }else{
                $(dd.proxy).remove();
            }
        });

    },

    remove: function(){
        $(this.clone).remove();
        View.prototype.remove.call(this); 
    }
});
