var ModalView = require('../../../../core/views/ModalView');
var template = require('./widget-settings.html');
var rivets = require('../../../../core/rivets');

module.exports = ModalView.extend({
    contentTemplate: template,
    contentData: function () {
        return {};
    },
    onSave: function(){
        this.$el.modal('hide');
        this.remove(); 
    },
    afterRenderContent: function () {
        rivets.bind(this.el, {
            settings: this.model
        });

    }

});
