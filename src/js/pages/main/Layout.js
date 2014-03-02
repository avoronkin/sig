var LayoutView = require('../../core/views/LayoutView');
var Structure = require('../../core/Structure');
var mediator = require('../../core/mediator');
var template = require('./layout.html');
var Tree = require('./blocks/tree/Tree');
var Table = require('./blocks/table/Table');
var Items = require('../../models/Items').Collection;

var tableItems = new Structure([{
    name: 'Название 1',
    parentName:  'root',
    description: 'Описание',
    date: 1393660217834
}, {
    name: 'Название 2',
    parentName:  'root',
    description: 'Описание',
    date: 1393660217834

}]);

var treeItems = new Structure([{
    name: 'test',
    description: '',
    date:  1393660217834,
    parentName: 'root',
}, {
    name: 'test2',
    description: '',
    date:  1393660217834,
    parentName: 'test'
}, {
    name: 'test3',
    description: '',
    date:  1393660217834,
    parentName: 'test'
}]);

module.exports = LayoutView.extend({
    initialize: function () {

        mediator.on('moveTrToNode', this.moveTrToNode);
        mediator.on('moveNodeToNode', this.moveNodeToNode);
        mediator.on('moveNodeToTable', this.moveNodeToTable);

        this.keepEl = true;
        this.views = {
            '#tree': {
                constructor: Tree,
                options: {
                    collection: treeItems,
                    containerSelector: '.children'
                }
            },
            '#table': {
                constructor: Table,
                options: {
                    collection: tableItems,
                    containerSelector: 'tbody'
                }
            }
        };
    },
    moveNodeToTable: function (cid) {
        var model = treeItems.findModelByCid(cid);
        if (model) {
                tableItems.add(model);
                model.collection = tableItems;
                treeItems.remove(model);

            if(model.hasChildren()){
                var models = model.getChildren();
                tableItems.add(models);
                treeItems.remove(models);
            }
        }
    },
    moveNodeToNode: function (childCid, parentCid) {
        if (childCid === parentCid) {
            return;
        }
        var childModel = treeItems.findModelByCid(childCid);
        var parentModel = treeItems.findModelByCid(parentCid);
        childModel.set('parentName', parentModel.get('name'));
    },
    moveTrToNode: function (tableModelCid, treeModelCid) {
        var tableModel = tableItems.findModelByCid(tableModelCid);
        var treeModel = treeItems.findModelByCid(treeModelCid);
        console.log('ytyty', tableModel);
        treeModel.addChild(tableModel);
        tableItems.remove(tableModel);
        tableModel.collection = treeModel.collection;
        console.log('move tr '+tableModelCid+' to node '+treeModelCid, tableModel, treeModel, treeItems, tableItems);
    },
    template: template
});
