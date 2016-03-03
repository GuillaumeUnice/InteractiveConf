/*******************************************************************************
 *                                BASE SETUP
 *******************************************************************************/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var tweetTracker = require('./our_modules/tweetTracker');
tweetTracker.startTrack();

/*******************************************************************************
 *                              LES ROUTES
 *******************************************************************************/
var routes = require('./routes/api');
var responseAPI = require('./routes/responseAPI');
var questionAPI = require('./routes/questionAPI');
var favoriteAPI = require('./routes/favoriteAPI');
var publicAPI = require('./routes/publicAPI');
var noteAPI = require('./routes/noteAPI');
var tweetAPI = require('./routes/tweetAPI');

var app = express();

/*******************************************************************************
 *                              ENGINE AND VIEWS
 *******************************************************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*******************************************************************************
 *                                  APP USE
 *******************************************************************************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/api/response', responseAPI);
app.use('/api/question', questionAPI);
app.use('/api/favorite', favoriteAPI);
app.use('/api/public', publicAPI);
app.use('/api/note', noteAPI);
app.use('/api/tweet', tweetAPI);

module.exports = app;