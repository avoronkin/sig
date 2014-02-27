var Backbone = require('backbone');
var treeModelMixin = require('backbone.model.tree.mixin');
var _ = require('underscore');


var Page = Backbone.Model.extend(_.extend(treeModelMixin, {}));

module.exports = Page;
