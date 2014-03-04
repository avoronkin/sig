var View = require('../../../../core/views/View');
var template = require('./widgets.html');
var $ = require('jquery');
// require('jquery.event.drag');
require('jquery.gridster');

module.exports = View.extend({
    initialize: function () {
        this.keepEl = true;
    },
    template: template,
    // data: function () {
    //     return this.model.toJSON();
    // },
    afterRender: function () {

        var gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [100, 55],
            resize: {
                enable: true 
            }
        }).data('gridster');

        console.log('w after render ', gridster)
        var widgets = [
            ['<li>0</li>', 1, 2],
            ['<li>1</li>', 3, 2],
            ['<li>2</li>', 3, 2],
            ['<li>3</li>', 2, 1],
            ['<li>4</li>', 4, 1],
            ['<li>5</li>', 1, 2],
            ['<li>6</li>', 2, 1],
            ['<li>7</li>', 3, 2],
            ['<li>8</li>', 1, 1],
            ['<li>9</li>', 2, 2],
            ['<li>10</li>', 1, 3]
        ];

        $.each(widgets, function (i, widget) {
            gridster.add_widget.apply(gridster, widget)
        });

    }
});
