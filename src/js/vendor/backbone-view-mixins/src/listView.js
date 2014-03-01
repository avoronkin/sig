var _ = require('underscore');

var listView = function () {
    this.setDefaults({
        itemView: null,

        itemViewOptions: {},

        renderList: function () {
            this.removeList();
            console.log('renderList')
            this.container = document.createDocumentFragment();

            this.collection.each(this.renderListItem, this);

            this.$containerEl.append(this.container);

        },

        renderListItem: function (model) {
            _.extend(this.itemViewOptions, {
                model: model
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
        }
    });

    // this.before('initialize', function () {
    //     this._views = [];
    //     this.once('render', function () {
    //         this.listenTo(this.collection, 'reset add remove', this.renderList);
    //     });
    //     console.log('before init', this)
    // });

    this.around('render', function (render) {
        render();
        this.setContainerEl();
        this.renderList();
        this.trigger('render');
        return this;
    });

    this.before('remove', function () {
        console.log('before remove');
        this.removeList();
    });


};


module.exports = listView;
