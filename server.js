const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine', 'hbs');

// middleware to log requests
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {console.log('Unable to append log.');}
    })
    next();
});

// middleware to notify abour maintenance
app.use((req, res, next) => {
    res.render('maintenance.hbs');
    next();
});

// serve static pages
app.use(express.static(__dirname + '/public'));

// handlebar helper functions
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (str) => {
    return str.toUpperCase();
});

// Handler for HTTP GET
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the web page'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>Hello Express!<h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}.`);
});
