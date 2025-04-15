const { nanoid } = require('nanoid');
const accounts = require('./accounts'); // Ganti dengan database accounts

const bcrypt = require("bcryptjs");

const addAccountHandler = (request, h) => {
  const { username, fullName, password } = request.payload;

  const usernameAlreadyExists = accounts.filter((account) => account.username === username).length > 0;

  if (usernameAlreadyExists) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal mendaftarkan akun. username sudah terambil'
    });
    response.code(409);
    return response;
  };
  
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const token = bcrypt.hashSync(nanoid(10), salt);

  const newAccount = { username, fullName, password: passwordHash, token };

  accounts.push(newAccount);

  const isSuccess = accounts.filter((account) => account.username === username).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Akun berhasil terdaftar',
      data: { token }
    });
    console.log(accounts)
    response.code(201);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Akun gagal didaftarkan',
  });
  response.code(500);
  return response;
};

const getAccountHandler = (request, h) => {
  const { username, password } = request.payload;
  const account = accounts.filter((searched) => searched.username === username)[0];
  
  if (account !== undefined) {
    const isPasswordCorrect = bcrypt.compareSync(password, account.password);
    if (isPasswordCorrect) {
      console.log(accounts)
      const salt = bcrypt.genSaltSync(10);
      const token = bcrypt.hashSync(nanoid(10), salt);
      account.token = token;
      return {
        status: 'success',
        message: 'Akun berhasil diakses',
        data: { token }
      };
    } else {
      const response = h.response({
        status: 'fail',
        message: 'Gagal mengakses akun, password tidak cocok'
      });
      response.code(401);
      return response;
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'username tidak ditemukan',
  });
  response.code(404);
  return response;
};
const getAccountByAuthTokenHandler = (request, h) => {
  const { find } = request.query;
  const { token } = request.params;
  const account = accounts.filter((searched) => searched.token == token)[0];
  console.log(accounts[0].token)
  console.log(typeof token)
  if (account !== undefined) {
    switch (find) {
      case undefined: {
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { username: account.username, fullName: account.fullName }
        };
      };
    };
  };

  const response = h.response({
    status: 'fail',
    message: 'Akun tidak dapat diakses, token tidak valid'
  });
  response.code(401);
  return response;
};
/*
  const { find } = request.query;
  const { token } = request.params;
  const account = accounts.filter((searched) => searched.token === token)[0];
  
  if (account !== undefined) {
    switch (find) {
      case "username": {
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { username: account.username }
        };        
      };
      case "fullName": {
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { fullName: account.fullName }
        };        
      };
      case undefined: {
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { username: account.username, fullName: account.fullName }
        };
      };
    };
  };
const getAccountByAuthTokenHandler = (request, h) => {
  const { token } = request.params;
  const { find } = request.query;
  console.log(accounts[0].token);
  console.log(searched.token == token);
  const account = accounts.filter((searched) => searched.token === token)[0];

  if (account !== undefined) {
    console.log(account)
    switch (find) {
      case "username": 
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { username: account.username }
        };        
      case "fullName": 
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { fullName: account.fullName }
        };        
      case undefined: 
        return {
          status: 'success',
          message: 'Akun berhasil diakses',
          data: { username: account.username, fullName: account.fullName }
        };
    };
  };

  const response = h.response({
    status: 'fail',
    message: 'Akun tidak dapat diakses, token tidak valid'
  });
  response.code(401);
  return response;
};
*/
const invalidateAuthToken = (request, h) => {
  const { token } = request.params;
  const account = accounts.filter((searched) => searched.token === token)[0];

  if (account !== undefined) {
    account.token = "";
    const response = h.response({
      status: 'success',
      message: 'token berhasil dihapus'
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'token tidak dapat dihapus, akun tidak ditemukan'
  });
  response.code(404);
  return response;
};

module.exports = { addAccountHandler, getAccountHandler, getAccountByAuthTokenHandler, invalidateAuthToken };
