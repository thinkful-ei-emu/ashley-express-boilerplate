require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const morganOptions = process.env.NODE_ENV === 'production'
  ? 'common'
  : 'dev';
app.use(morgan(morganOptions));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!');
});

app.use(function errorHandler(error, req, res, next){
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = {error: {message: 'server error'}};
  }
  else {
    console.error(error);
    response = {message: error.message, error};
  }
  res.status(500).json(response);
});
  

module.exports = app;
