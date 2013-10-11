var express = require('express')
    , hbs = require('handlebars')
    , consolidate = require('consolidate')
    , lessMiddleware = require('less-middleware')
    , fs = require("fs");

var app = express();


//consolidate setup for view engine
app.configure( function() {

    app.set('views', __dirname + '/templates');
    app.set('view engine', 'handlebars');
    app.set("view options", { layout: false }); 
    app.engine('hbs', consolidate.handlebars); //set filename

    //compile less
    app.use(lessMiddleware({
        src: __dirname + '/styles',
        dest: __dirname + '/public/styles',
        prefix: '/styles',
        compress: true,
        debug: true
    }));

    app.use(express.static(__dirname + '/public'));
});

// Register partials
var partials = "./templates/partials/";
fs.readdirSync(partials).forEach(function (file) {
    var source = fs.readFileSync(partials + file, "utf8"),
        partial = /(.+)\.hbs/.exec(file).pop();
 
    hbs.registerPartial(partial, source);
});



// Routes
app.get('/', function(req, res) {
        var data = {title:"Your Web App", body:"Hello World!"};
        res.render("home.hbs", data);  //Use Extension here
});


app.listen(3000);

console.log('You Done Did It!');