// var Backbone = require('backbone');
var _ = require('underscore');
var View = require('./View');

module.exports = View.extend({
    itemView: View,

    itemViewOptions: {},

    getItems: function () {
        return this.collection.models;
    },

    renderList: function () {
        this.removeList();
        // console.log('renderList')
        this.container = document.createDocumentFragment();
        var items = this.getItems();

        _(items).each(this.renderListItem, this);

        this.$containerEl.append(this.container);

    },

    renderListItem: function (model) {
        _.extend(this.itemViewOptions, {
            model: model,
            collection: this.collection
        });

        var view = new this.itemView(this.itemViewOptions);

        this._views.push(view);

        this.container.appendChild(view.render().el);
    },

    setContainerEl: function () {
        if (this.options.containerSelector) {
            this.$containerEl = this.$(this.options.containerSelector);
        } else {
            this.$containerEl = this.$el;
        }
    },

    removeList: function () {
        _.invoke(this._views, 'remove');
        this._views = [];
    },

    render: function () {
        View.prototype.render.call(this);
        this.setContainerEl();
        this.renderList();
        this.trigger('render');
        return this;
    },

    remove: function () {
        this.removeList();
        View.prototype.remove.call(this);
        return this;
    },

    toString: function () {
        return 'ListView';
    }

});
