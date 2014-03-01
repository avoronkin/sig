var BaseView = require('../../core/views/BaseView');
var template = require('./layout.html');
var Tree = require('./blocks/tree/Tree');
var Table = require('./blocks/table/Table');
var Items = require('../../models/Items').Collection;

var tableItems = new Items([{
    name: 'Название 1',
    description: 'Описание',
    date: 1393660217834
}, {
    name: 'Название 2',
    description: 'Описание',
    date: 1393660217834

}]);

module.exports = BaseView.extend({
    initialize: function () {
        this.keepEl = true;
        this.views = {
            '#tree': {
                constructor: Tree,
                options: {}
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
    template: template
});
