var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var filmsRouter = require('./routes/films');

var app = express();

const statReq = {};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    const currentOperation = `${req.method} ${req.path}`;
    const counterOperation = statReq[currentOperation];
    if (counterOperation === undefined) statReq[currentOperation] = 0;
    statReq[currentOperation] += 1;
    const statsMessage = `Request counter : \n${Object.keys(statReq)
      .map((operation) => `- ${operation} : ${statReq[operation]}`)
      .join('\n')}
        `;
    console.log(statsMessage);
    next();
  });
  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/films', filmsRouter);

module.exports = app;
