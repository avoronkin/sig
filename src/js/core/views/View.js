var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
    constructor: function (options) {
        options = options || {};
        this.keepEl = !! options.keepEl;

        Backbone.View.apply(this, arguments);
    },

    template: function () {
        throw new Error('where underscore compiled template??');
    },

    data: function () {
        return {};
    },

    getRenderedTemplate: function () {
        var html = this.template(this.data(), {
            // variable: 'data'
        });

        return html;
    },

    render: function () {
        this.$el.html(this.getRenderedTemplate());
        this.afterRender();
        return this;
    },

    afterRender: function () {},

    remove: function () {
        if (this.keepEl) {
            this.$el.html('');
        } else {
            this.$el.remove();
        }

        this.$el.unbind();//undelegateEvents();
        this.stopListening();
        return this;
    }

});
