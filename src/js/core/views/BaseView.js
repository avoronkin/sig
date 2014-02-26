var Backbone = require('backbone');
var Factory = require('../../vendor/Backbone.AdviceFactory/advicefactory');
var underscoreTemplate = require('../../vendor/backbone-view-mixins/src/underscoreTemplate');
var baseRender = require('../../vendor/backbone-view-mixins/src/baseRender');
// var helpers = require('../../vendor/backbone-view-mixins/src/helpers');

var afterRender = require('../../vendor/backbone-view-mixins/src/afterRender');
var keepEl = require('../../vendor/backbone-view-mixins/src/keepEl');
var subViews = require('../../vendor/backbone-view-mixins/src/subViews');

module.exports = Factory.register('view', {
    base: Backbone.View,

    mixins: [
        baseRender,
        underscoreTemplate,
        // helpers,
        afterRender,
        keepEl,
        subViews
    ],

    setDefaults: {},

    clobber: {
        // getHelpers: function () {
        //     return {
        //         helpers: {
        //             test: function () {
        //                 return 'hello world!';
        //             }
        //         }
        //     };
        // },
        toString: function () {
            return 'BaseView';
        }
    }
});
