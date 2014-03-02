var Backbone = require('backbone');
var treeModelMixin = require('backbone.model.tree.mixin');
var _ = require('underscore');


var Page = Backbone.Model.extend(_.extend(treeModelMixin, {
    hasChildren: function(){
        var name = this.get('name');

        var children = this.collection.filter(function(model){
            return name === model.get('parentName');  
        });

        return !!children.length;
    }
}));

module.exports = Page;
