import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import models from '../models';

const { User } = models;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  algorithms: ['HS256']
};

export default (passport) => {
  passport.use(new JwtStrategy(options, (async (payload, done) => {
    // We will assign the `sub` property on the JWT to the database ID of user
    try {
      const user = await User.findByPk(payload.sub);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })));
};
