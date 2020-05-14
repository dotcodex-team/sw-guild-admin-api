const jwt = require('jsonwebtoken');

const options = { expiresIn: '60m' };
const refreshOptions = { expiresIn: '365 days' };
const { SECRET_KEY, REFRESH_KEY } = require('../config').keys;

const getUserInfo = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email
});

const signToken = (user) => {
  const token = jwt.sign({ sub: user.id }, SECRET_KEY, options);
  return token;
};

const signRefreshToken = (user) => {
  const token = jwt.sign({ sub: user.id }, REFRESH_KEY, refreshOptions);
  return token;
};

const verifyToken = (token) => new Promise((resolve, reject) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    resolve(verify);
  } catch (error) {
    reject(error);
  }
});

const verifyRefreshToken = (token) => new Promise((resolve, reject) => {
  try {
    const verify = jwt.verify(token, REFRESH_KEY);
    resolve(verify);
  } catch (error) {
    reject(error);
  }
});

module.exports = {
  signToken,
  signRefreshToken,
  verifyToken,
  getUserInfo,
  verifyRefreshToken
};
