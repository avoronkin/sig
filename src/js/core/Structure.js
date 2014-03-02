var Backbone = require('backbone');
var mediator = require('./mediator');
var _ = require('underscore');
var Page = require('./Page');

var Structure = Backbone.Collection.extend({
    model: Page,

    constructor: function () {
        mediator.on('page:change', this.onPageChange, this);
        Backbone.Collection.apply(this, arguments);
    },

    onPageChange: function (page) {
        var item = this.find(function (model) {
            return model.get('name') === page.get('name');
        });

        this.invoke('set', {
            'active': false,
            'here': false
        }, {
            silent: true
        });


        if (item) {
            var models = item.getPatch();

            _.invoke(models, 'set', {
                'active': true
            });

            item.set('here', true);
            this.trigger('changed');
        }
    },

    getCurrent: function () {
        var current = this.findWhere({
            'here': true
        });

        return current;
    },

    findModelByCid: function (cid) {
        return this.find(function (model) {
            return model.cid === cid;
        });
    }

});

module.exports = Structure;
