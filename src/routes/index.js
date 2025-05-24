const express = require('express');
const app = express();
const v1ApiRoutes = require('./v1/index');

app.use('/v1', v1ApiRoutes);

module.exports = app;