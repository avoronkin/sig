var BaseView = require('../../../../core/views/BaseView');
var template = require('./tr-edit.html');
var rivets = require('../../../../core/rivets');

module.exports = BaseView.extend({
    template: template,
    tagName: 'tr',
    events: {
        'click .save': 'onClickSave'
    },
    onClickSave: function () {
        console.log('click save');
        this.setState('show');
    },
    setState: function (state) {
        this.model.set('state', state);
    },
    data: function () {
        return this.model.toJSON();
    },
    afterRender: function () {
        rivets.bind(this.el, {
            item: this.model
        });

    }
});
