const routes = require('express').Router();
const { User } = require('./app/models');

User.create({
  name: 'Edilson',
  email: 'edilson.pacheco@aoop.com.br',
  password_hash: '18932781923719237as',
});

module.exports = routes;
