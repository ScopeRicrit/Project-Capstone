const { addAccountHandler, getAccountHandler } = require('../handlers/authHandlers');

const routes = [
  {
    method: 'POST',
    path: '/accounts',
    handler: addAccountHandler
  },
  {
    method: 'POST',
    path: '/accounts/login',
    handler: getAccountHandler
  },
];

module.exports = routes;
