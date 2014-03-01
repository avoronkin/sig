var CollectionView = require('../../../../core/views/CollectionView');
var mediator = require('../../../../core/mediator');
var template = require('./table.html');
var Tr = require('./Tr');
var TrEdit = require('./TrEdit');
var _ = require('underscore');

module.exports = CollectionView.extend({
    events: {
        'click .add-item': 'addItem'
    },
    itemView: Tr,
    initialize: function (options) {
        this.options = options;
        this.listenToOnce(this, 'render', function () {
            this.listenTo(this.collection, 'reset add remove', this.renderList);
        });
        this._views = [];
        this.listenTo(this.collection, 'change:state', this.rerenderItem);
        mediator.on('table:remove',function(cid){
            var model = this.collection.find(function(model){
                return cid = model.cid; 
            });
            if(model){
                // model.collection.remove(model); 
            }
            console.log('tr', cid, model) 
        },this)
    },
    rerenderItem: function (model, state) {
        console.log('render item', this._views)
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
    addItem: function () {
        this.collection.add([{
            name: 'trtrtr',
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
