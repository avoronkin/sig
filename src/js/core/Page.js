var Backbone = require('backbone');
var treeModelMixin = require('backbone.model.tree.mixin');
var mediator = require('./mediator');
var _ = require('underscore');


var Page = Backbone.Model.extend(_.extend(treeModelMixin, {
    register: function () {
        mediator.trigger('page:register', this);
    }

}));
// console.log('page', Page);
module.exports = Page;
