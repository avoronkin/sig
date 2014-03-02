var Backbone = require('backbone');
var _ = require('underscore');
var View = require('./View');

module.exports = View.extend({
    constructor: function (options) {
        options = options || {};

        this.views = options.views || {};
        View.apply(this, arguments);
    },

    createSubView: function (view) {
        if (!view.instance) {
            view.instance = new view.constructor(view.options);
        }
    },

    renderSubViews: function () {
        _.each(this.views, this.renderSubView, this);
    },

    renderSubView: function (view, el) {
        this.createSubView(view);
        view.instance.setElement(el).render();
    },

    removeSubViews: function () {
        _.each(this.views, this.removeSubView, this);
    },

    removeSubView: function (view) {
        if (view.instance) {
            view.instance.remove();
        }
    },

    render: function () {
        View.prototype.render.call(this);
        this.renderSubViews();
        return this;
    },

    remove: function(){
        this.removeSubViews();
        View.prototype.remove.call(this);
        return this;
    }

});
