var View = require('../../../../core/views/View');
var WidgetSettingsView = require('./WidgetSettings');
var template = require('./widget.html');
var mediator = require('../../../../core/mediator');
var _ = require('underscore');

var $ = require('jquery');
require('jquery.flot');
require('jquery.flot.resize');


module.exports = View.extend({
    initialize: function () {
        // console.log('init widget view')
        this.listenTo(this.model, 'change', this.afterRender);
    },
    events: {
        'click .remove': 'removeWidget',
        'click .settings': 'editSettings',
    },

    data: function () {
        return _.extend(this.model.toJSON(), {
            cid: this.model.cid
        });
    },
    attributes: function () {
        return {
            'data-row': this.model.get('row'),
            'data-col': this.model.get('col'),
            'data-sizex': this.model.get('size_x'),
            'data-sizey': this.model.get('size_y'),
        };
    },
    tagName: 'li',
    className: 'gs-w',
    template: template,

    editSettings: function () {
        var modal = new WidgetSettingsView({
            title: 'Настройки виджета',
            model: this.model
        });

        modal.show();
        console.log('edit settings');
    },

    removeWidget: function () {
        mediator.trigger('widget:remove', this);
    },
    afterRender: function () {
        console.log('afterRender')
        var self = this;

        var label = this.model.get('label');
        var showLines = this.model.get('dataShowLines');
        var showPoints = this.model.get('dataShowPoints');
        var color = this.model.get('color');
        var totalPoints = this.model.get('totalPoints') || 50;
        // We use an inline data source in the example, usually data would
        // be fetched from a server

        var data = [];

        if(this.intervalId){
            console.log('clear interval')
            clearInterval(this.intervalId) 
        }

        function getRandomData() {

            if (data.length > 0)
                data = data.slice(1);

            // Do a random walk

            while (data.length < totalPoints) {

                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }

                data.push(y);
            }

            // Zip the generated y values with the x values

            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }

            return {
                data: res,
                label: label,
                color: color,
                shadowSize: 0, // Drawing is faster without shadows
                points: {
                    show: showPoints,
                },
                lines: {
                    show: showLines 
                }

            };
        }

        // Set up the control widget

        var updateInterval = 300;
        var plot = $.plot(self.$el.find(".chart"), [getRandomData()], {
            yaxis: {
                position: 'right',
                min: 0,
                max: 100
                // show: false
            },
            xaxis: {
                // min:0,
                // max:100,
                show: false
            }
        });

        function update() {

            plot.setData([getRandomData()]);

            // Since the axes don't change, we don't need to call plot.setupGrid()

            plot.draw();
        }
        this.intervalId = setInterval(update, updateInterval);

    }
});
