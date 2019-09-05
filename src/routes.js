const routes = require('express').Router();
const sessionControler = require('./app/controllers/sessionController');

routes.post('/sessions', sessionControler.store);

module.exports = routes;
