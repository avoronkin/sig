var mediator = require('./core/mediator');
var Structure = require('./core/Structure');
var MainPage = require('./pages/Main');
var WidgetsPage = require('./pages/Widgets');
var Backbone = require('backbone');
var $ = require('jquery'); //(window);
Backbone.$ = $;
var BaseView = require('./core/views/BaseView');
var v = new BaseView();
console.log('v',v);




var structure = new Structure();
var router = new Backbone.Router();
var mainPage = new MainPage();
var widgetsPage = new WidgetsPage();

// structure.on('add remove change', function () {
//     console.log('structure', structure.toJSON());
// });

mediator.on('page:change', function (page) {
    console.log('page:change', page);
    $('title').text(page.get('title'));
});

mediator.on('page:register', function (page) {
    structure.add(page);
    router.route(page.get('route'), page.get('name'), function (routeParams) {
        page.routeParams = routeParams;
        mediator.trigger('page:change', page);
    });

    console.log('page:register', page.toJSON());
}, this);

mainPage.register();
widgetsPage.register();


Backbone.history.start({
    pushState: true
});

$('body')
    .on('click', 'a[href^="/"]', function (event) {
        if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            var path = $(event.currentTarget).attr('href');
            event.preventDefault();
            router.navigate(path, {
                trigger: true
            });
        }
    });
