var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 

require('dotenv').config();
var sessiom= require('express-session');
var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');
var loginRouter = require('./routes/admin/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'asdertplomdjklsioprkj',
  resave: false,
  saveUninitialized: true
}));                    

app.get('/', function(req, res)   {
  var conocido =Boolean(req.session.nombre);
  res.render('index',   {
    title: 'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});
  
app.post('/ingresar', function(req, res) {
  console.log(req.body.nombre)
  if (req.body.nombre)  {
    req.session.nombre = req.body.nombre  
  }
  res.redirect ('/');
  });

  app.get('/salir', function(req , res) {
    req.session.destroy();
    res.redirect('/');
  });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);

/*ARMO LAS RUTAS */
app.get('/aboutme', function(req, res) {
  res.send('hola soy la pagina de aboutme')
})
app.get('/skills', function(req, res) {
  res.send('hola soy la pagina de skills')
})
app.get('/contacto', function(req, res) {
  res.send('hola soy la pagina de contacto')
})


//select
pool.query('select * from Visitantes').then(function(resultados) {
  console.log(resultados)
});


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
