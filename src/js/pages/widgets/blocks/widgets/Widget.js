var View = require('../../../../core/views/View');
var template = require('./widget.html');
var mediator = require('../../../../core/mediator');
var _ = require('underscore');

var $ = require('jquery');
require('jquery.flot');
require('jquery.flot.resize');

module.exports = View.extend({
    initialize: function () {
        console.log('init widget view')
    },
    events: {
        'click .remove': 'removeWidget'
    },

    data: function () {
        return _.extend(this.model.toJSON(), {
            cid: this.model.cid
        });
    },
    attributes: function () {
        return {
            'data-row': this.model.get('row'),
            'data-col': this.model.get('col'),
            'data-sizex': this.model.get('size_x'),
            'data-sizey': this.model.get('size_y'),
        };
    },
    tagName: 'li',
    className: 'gs-w',
    template: template,
    removeWidget: function () {
        mediator.trigger('widget:remove', this);
    },
    afterRender: function () {
        var self = this;
        var d1 = [];
        for (var i = 0; i < 14; i += 0.5) {
            d1.push([i, Math.sin(i)]);
        }
        setTimeout(function(){
            $.plot('#' + self.model.cid + "-placeholder",[d1]);
        
        },50);
    }
});
