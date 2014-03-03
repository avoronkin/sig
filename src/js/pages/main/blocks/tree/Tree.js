var CollectionView = require('../../../../core/views/CollectionView');
var ListView = require('../../../../core/views/ListView');
var View = require('../../../../core/views/View');
var Node = require('./Node');
var mediator = require('../../../../core/mediator');
var template = require('./tree.html');
var $ = require('jquery');
require('jquery.event.drop');
var _ = require('underscore');

module.exports = ListView.extend({
    template: template,

    itemView: Node,

    initialize: function (options) {
        this.options = options;
        this.listenTo(this.collection, 'add remove reset ', this.render);
        this.listenTo(this.collection, 'change:parentName', function(){
            console.log('collection change ', arguments);
            this.render()
        });
    },

    getItems: function () {
        var items = this.collection.filter(function (model) {
            return 'root' === model.get('parentName');
        });
        return items;
    },

    afterRender: function () {

        console.log('afterRender tree', this);

        // this.$el.find('.tree-drop').drop(function (ev, dd) {
        //     var cid = $(dd.drag).data('cid');
        //     mediator.trigger('table:remove', cid);
        //     // console.log('drop', cid, ev, dd);
        // }).drop("start", function () {
        //     $(this).addClass("drop-active");
        // }).drop("end", function () {
        //         $(this).removeClass("drop-active");
        //     });
    },

    toString: function () {
        return 'Tree';
    }
});
