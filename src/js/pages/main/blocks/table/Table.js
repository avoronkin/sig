var ListView = require('../../../../core/views/ListView');
var mediator = require('../../../../core/mediator');
var template = require('./table.html');
var Tr = require('./Tr');
var TrEdit = require('./TrEdit');
var _ = require('underscore');
var $ = require('jquery');

module.exports = ListView.extend({
    events: {
        'click .add-item': 'addItem'
    },
    itemView: Tr,
    initialize: function (options) {
        this.options = options;
        this.listenToOnce(this, 'render', function () {
            this.listenTo(this.collection, 'reset add remove', this.renderList);
        });
        this.listenTo(this.collection, 'change:state', this.rerenderItem);
    },
    rerenderItem: function (model, state) {
        state = state || 'show';
        this['renderItem' + state.charAt(0).toUpperCase() + state.slice(1) + 'State'](model);
    },
    getModelView: function (model) {
        var modelCid = model.cid;

        return _(this._views).find(function (view) {
            return view.model.cid === modelCid;
        });
    },
    replaceModelView: function (model, newView) {
        var oldView = this.getModelView(model);
        var el = oldView.el;
        oldView.keepEl = true;
        oldView.remove();
        oldView.undelegateEvents();

        newView.setElement(el).render();
        var index = this._views.indexOf(oldView);
        this._views[index] = newView;

    },
    renderItemShowState: function (model) {
        var tr = new Tr({
            model: model
        });
        this.replaceModelView(model, tr);
    },
    renderItemEditState: function (model) {
        var tr = new TrEdit({
            model: model
        });
        this.replaceModelView(model, tr);
    },

    afterRender: function () {
        this.$el.find('table').drop(function (ev, dd) {
            var cid = $(dd.drag).data('cid');
            var type = $(dd.drag).data('type');
            if (type === 'tree' && cid) {
                mediator.trigger('moveNodeToTable', cid);
            }
            console.log('drop', cid, type, ev, dd);
        }).drop("start", function (ev, dd) {
            // var type = $(dd.drag).data('type');
            // if (type === 'tree') {
                $(this).addClass("drop-active");
            // }
            console.log('start', arguments);
        }).drop("end", function () {
            $(this).removeClass("drop-active");
        });
    },
    addItem: function () {
        this.collection.add([{
            name: '',
            parentName: 'root',
            description: '',
            date: (new Date()).getTime()
        }]);
    },
    // data: function(){
    //     var data = {};
    //     data.items = this.collection.toJSON();

    //     return data;
    // },
    template: template
});
