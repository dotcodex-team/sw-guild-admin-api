const jwt = require('jsonwebtoken');

const { SECRET_KEY, REFRESH_KEY } = require('../config').keys;

const getUserInfo = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email
});

const signToken = (user) => {
  const options = { expiresIn: process.env.JWT_EXPIRES_IN };
  const token = jwt.sign({ sub: user.id }, SECRET_KEY, options);
  return token;
};

const signRefreshToken = (user) => {
  const refreshOptions = { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN };
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
