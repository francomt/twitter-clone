const express = require('express');
const morgan = require('morgan');
const path = require('path');
//express app
const app = express();

//morgan logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//serve static files middleware
app.use(express.static(path.join(`${__dirname}/public`)));

//parsing middleware
app.use(express.json());

//api routes (match all requests to /api)
app.use('/api', require('./apiRoutes/index'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

//send index.html for any requests that dont match APIs (sends our SPA)
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

//handle 500 errors
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error!');
});

module.exports = app;
