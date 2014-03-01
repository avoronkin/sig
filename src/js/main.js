var mediator = require('./core/mediator');
var Structure = require('./core/Structure');
var MainPage = require('./pages/main/Page');
var WidgetsPage = require('./pages/widgets/Page');
var Backbone = require('backbone');
var $ = require('jquery'); //(window);
Backbone.$ = $;
var MenuView = require('./topMenu/Menu');

var structure = new Structure();
var router = new Backbone.Router();
var mainPage = new MainPage();
var widgetsPage = new WidgetsPage();

var views = {};
var el = '#main';

mediator.on('page:change', function (page) {
    $('title').text(page.get('title'));

    var layout = page.get('layout');

    if (views[el] && views[el].remove) {
        views[el].remove();
    }

    views[el] = new layout.constructor();
    views[el].setElement(el).render();
    console.log('views', views);
});

structure.on('add', function (page) {
    router.route(page.get('route'), page.get('name'), function (routeParams) {
        page.routeParams = routeParams;
        mediator.trigger('page:change', page);
    });

    console.log('page added', page.toJSON());
}, this);

structure.add([mainPage, widgetsPage]);

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
