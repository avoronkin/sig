var Backbone = require('backbone');

var Item = Backbone.Model.extend({
    defaults: {
        // name: '',
        // description: '',
        // date: (new Date()).getTime()
    }
});

var Items = Backbone.Collection.extend({
    model: Item,
    findModelByCid: function (cid) {
        return this.find(function (model) {
            return model.cid === cid;
        });
    }
});

module.exports = {
    Model: Item,
    Collection: Items
};
