var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { text } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/boring', function(req, res) {
  res.send("this is a boring line of text")
});

app.get('/exciting', function(req,res) {
  res.render('exciting.ejs')
})

app.get('/dynamic_template_practice', function(req, res) {
  let x = 5
  let myFavouriteFruit = 'kiwi'
  res.render('test.ejs', {x: x, favFruit: myFavouriteFruit, name: "alex"});
});

let viewCount = 0
app.get('/really_exciting', function(req, res) {
  viewCount += 1
  res.render('really_exciting.ejs', {viewCount : viewCount})
})

let pokemon = [
  {id:"000", name:"bulbasaur", image: "https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/375px-001Bulbasaur.png"},
  {id:"001", name:"squirtle", image:"http://static.pokemonpets.com/images/monsters-images-800-800/7-Squirtle.png"},
  {id:"002", name:"charmander", image:"https://cdn.bulbagarden.net/upload/7/73/004Charmander.png"},
]
app.get('/pokemon', function (req, res) {
  res.render('pokemon.ejs', {pokemon: pokemon}) 
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
