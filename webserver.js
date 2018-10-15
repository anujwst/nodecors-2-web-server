
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');


app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFileSync('server.log',log + '\n','utf8');
next();
});

app.use((req,res,next) => {
res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('fullYear', () => {
  return new Date().getFullYear();
});
app.get('/', (req,res) => {
  res.render('home.hbs', {
    titlePage: 'Welcome Mr. DBAs/Developer',
    welcomeMessage: 'Welcome to my Website',
    //fullYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    titlePage: 'About DBA',
    //fullYear: new Date().getFullYear()
  });
});


hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});





app.get('/bad', (req,res) => {
  res.send({
  errorMessage: 'Unable to handle request'
});
});
app.listen(3000, () => {
  console.log('Server is up pn port No 3000');
});
