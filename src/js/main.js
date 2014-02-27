var mediator = require('./core/mediator');
var Structure = require('./core/Structure');
var MainPage = require('./pages/Main');
var WidgetsPage = require('./pages/Widgets');
var Backbone = require('backbone');
var $ = require('jquery'); //(window);
Backbone.$ = $;
var MenuView = require('./topMenu/Menu');

var structure = new Structure();
var router = new Backbone.Router();
var mainPage = new MainPage();
var widgetsPage = new WidgetsPage();

mediator.on('page:change', function (page) {
    console.log('page:change', page);
    $('title').text(page.get('title'));
});

structure.on('add', function (page) {
    router.route(page.get('route'), page.get('name'), function (routeParams) {
        page.routeParams = routeParams;
        mediator.trigger('page:change', page);
    });

    console.log('page added', page.toJSON());
}, this);

structure.add([mainPage,widgetsPage]);

var topMenu = new MenuView({
    collection: structure
});
topMenu.start();
$('#top-menu').html(topMenu.el);



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
