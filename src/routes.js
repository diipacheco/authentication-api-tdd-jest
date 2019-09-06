const routes = require('express').Router();
const sessionControler = require('./app/controllers/sessionController');
const authMiddleware = require('./middlewares/auth');


routes.post('/sessions', sessionControler.store);
routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => {
  res.status(200).send();
});
module.exports = routes;
