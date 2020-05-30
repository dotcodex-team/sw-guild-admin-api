import express from 'express';
// import passport from 'passport';
import cors from '../middlewares/cors';
import hasRefreshToken from '../middlewares/hasRefreshToken';
import { validateRegister } from '../validators/authValidators';
import {
  createUser,
  loginUser,
  refreshToken
} from '../controllers/AuthController';
import authRequired from '../middlewares/authRequired';

const router = express.Router();
cors(router);

router.get('/', authRequired, (req, res) => {
  res.json({ hello: 'Hi from auth' });
});

router.post('/register', [validateRegister, createUser]);

router.post('/login', loginUser);

router.put('/refresh', hasRefreshToken, refreshToken);

module.exports = router;
