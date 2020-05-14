import express from 'express';
import passport from 'passport';
import cors from '../middlewares/cors';
import hasRefreshToken from '../middlewares/hasRefreshToken';
import { validateRegister } from '../validators/authValidators';
import {
  createUser,
  loginUser,
  refreshToken
} from '../controllers/AuthController';


const router = express.Router();
cors(router);

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ hello: 'Hi from auth' });
});

router.post('/register', [validateRegister, createUser]);

router.post('/login', loginUser);

router.post('/refresh', hasRefreshToken, refreshToken);

module.exports = router;
