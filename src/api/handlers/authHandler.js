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
  const hash = bcrypt.hashSync(password, salt);

  const newAccount = { username, fullName, password: hash };

  accounts.push(newAccount);

  const isSuccess = accounts.filter((account) => account.username === username).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Akun berhasil terdaftar',
      data: { username, fullName }
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
      const fullName = account.fullName;
      console.log(accounts)
      return {
        status: 'success',
        data: { account: { username, fullName } }
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

module.exports = { addAccountHandler, getAccountHandler };
