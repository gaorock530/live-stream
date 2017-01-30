const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();
//set view engine to hbs
app.set('view engine', 'hbs');
//register hbs.template to use '/views/partials' folder
hbs.registerPartials(__dirname + '/views/partials');
//make a static directory for public view using '/public'
app.use(express.static(__dirname + '/public'));
//using midware to write a log before render actual HTML
app.use((req, res, next) => {  
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e) console.log('Unable to append to server.log');
    });
    next();
});


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.listen(port);