var Backbone = require('backbone');
var advice = require('../../vendor/Backbone.Advice/advice');

// var Factory = require('../../vendor/Backbone.AdviceFactory/advicefactory');
var underscoreTemplate = require('../../vendor/backbone-view-mixins/src/underscoreTemplate');
var baseRender = require('../../vendor/backbone-view-mixins/src/baseRender');
// var helpers = require('../../vendor/backbone-view-mixins/src/helpers');

var afterRender = require('../../vendor/backbone-view-mixins/src/afterRender');
var keepEl = require('../../vendor/backbone-view-mixins/src/keepEl');
var subViews = require('../../vendor/backbone-view-mixins/src/subViews');
advice.addMixin(Backbone.View);


module.exports = Backbone.View.extend({
    toString: function () {
        return 'BaseView';
    }
}).mixin([
    baseRender,
    underscoreTemplate,
    // helpers,
    afterRender,
    keepEl,
    subViews
]);
