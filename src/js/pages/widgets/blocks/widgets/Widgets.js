var View = require('../../../../core/views/View');
var template = require('./widgets.html');
var $ = require('jquery');
require('jquery.event.drop');
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
        this.$el.find('ul').drop(function (ev, dd) {
            console.log('drop', ev, dd);
        }).drop("start", function (ev, dd) {
            // var type = $(dd.drag).data('type');
            // if (type === 'tree') {
                $(this).addClass("drop-active");
            // }
            console.log('start', arguments);
        }).drop("end", function () {
            $(this).removeClass("drop-active");
        });

        gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [100, 55],
            max_cols: 9,
            min_cols: 9,
            // min_rows:3,
            helper: 'clone',
            resize: {
                enabled: true 
            }
        }).data('gridster');

        var widgets = [
            ['<li>0</li>', 3, 3],
        //     ['<li>1</li>', 3, 2],
        //     ['<li>2</li>', 3, 2],
        //     ['<li>3</li>', 2, 1],
        //     ['<li>4</li>', 4, 1],
        //     ['<li>5</li>', 1, 2],
        //     ['<li>6</li>', 2, 1],
        //     ['<li>7</li>', 3, 2],
        //     ['<li>8</li>', 1, 1],
        //     ['<li>9</li>', 2, 2],
        //     ['<li>10</li>', 1, 3]
        ];

        $.each(widgets, function (i, widget) {
            gridster.add_widget.apply(gridster, widget)
        });

    }
});
