import { verifyRefreshToken } from '../utils/jwt';

const hasRefreshToken = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || '';
    const decoded = await verifyRefreshToken(token);
    req.user = decoded.sub;
    return next();
  } catch (err) {
    return res.status(401).send({
      message: 'refresh token expired'
    });
  }
};

module.exports = hasRefreshToken;
