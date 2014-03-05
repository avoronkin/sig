var LayoutView = require('../../core/views/LayoutView');
var Structure = require('../../core/Structure');
var mediator = require('../../core/mediator');
var template = require('./layout.html');
var Tree = require('./blocks/tree/Tree');
var Table = require('./blocks/table/Table');
// var Items = require('../../models/Items').Collection;
var _ = require('underscore');

var tableItems = new Structure([{
    name: 'Название 1',
    parentName: 'root',
    description: 'Описание',
    date: '12.12.2012'
}, {
    name: 'Название 2',
    parentName: 'root',
    description: 'Описание',
    date: '12.12.2012'

}]);

var treeItems = new Structure([{
    name: 'test',
    description: '',
    date: '12.12.2012',
    parentName: 'root',
}, {
    name: 'test2',
    description: '',
    date: '12.12.2012',
    parentName: 'test'
}, {
    name: 'test3',
    description: '',
    date: '12.12.2012',
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
            if (model.hasChildren()) {
                var models = model.getDescendants();

                tableItems.add(models);
                _.each(models, function (model) {
                    model.collection = tableItems;
                });
                treeItems.remove(models);
            }
            tableItems.add(model);
            treeItems.remove(model);
            model.collection = tableItems;

        }
    },
    moveNodeToNode: function (dragCid, dropCid) {
        if (dragCid === dropCid) {
            return;
        }
        var dragModel = treeItems.findModelByCid(dragCid);
        var dropModel = treeItems.findModelByCid(dropCid);

        if (dragModel.isAncestor(dropModel)) { //не перемещяем родителя в дочерний документ
            return;
        }
        dragModel.set('parentName', dropModel.get('name'));
    },
    moveTrToNode: function (dragCid, dropCid) {
        var tableModel = tableItems.findModelByCid(dragCid);
        var treeModel = treeItems.findModelByCid(dropCid);

        treeModel.addChild(tableModel);
        tableItems.remove(tableModel);
        tableModel.collection = treeItems;
        // console.log('move tr '+tableModelCid+' to node '+treeModelCid, tableModel, treeModel, treeItems, tableItems);
    },
    template: template
});
