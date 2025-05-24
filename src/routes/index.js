const express = require('express');
const router = express.Router();
const v1ApiRoutes = require('./v1/index');

app.use('/v1', v1ApiRoutes);

modeule.exports = router;