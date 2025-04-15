const { addAccountHandler, getAccountHandler, getAccountByAuthTokenHandler, invalidateAuthToken } = require('./authHandlers');

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
  {
    method: 'GET',
    path: '/accounts/{token}',
    handler: getAccountByAuthTokenHandler
  },
  {
    method: 'PUT',
    path: '/accounts/{token}',
    handler: invalidateAuthToken
  }
];

module.exports = routes;
