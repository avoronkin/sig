 var Backbone = require('backbone');
 var advice = require('../../vendor/Backbone.Advice/advice');

 var underscoreTemplate = require('../../vendor/backbone-view-mixins/src/underscoreTemplate');
 var baseRender = require('../../vendor/backbone-view-mixins/src/baseRender');
 var afterRender = require('../../vendor/backbone-view-mixins/src/afterRender');
 var keepEl = require('../../vendor/backbone-view-mixins/src/keepEl');
 var subViews = require('../../vendor/backbone-view-mixins/src/subViews');
 var listView = require('../../vendor/backbone-view-mixins/src/listView');

 advice.addMixin(Backbone.View);

 var CollectionView = Backbone.View.extend({}).mixin([baseRender, underscoreTemplate, afterRender, keepEl, listView]);

 module.exports = CollectionView;
