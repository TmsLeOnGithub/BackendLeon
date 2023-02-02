import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { UsersDao } from '../../db/index.js';



const init = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UsersDao.getById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          if (!email || !password) return done(null, false);

          const user = await UsersDao.getOne({ email: email });

          if (!user || user.password !== password) return done(null, false);

          const userResponse = {
            id: user._id,
            email: user.email,
          };

          done(null, userResponse);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};

export const PassportAuth = {
  init,
};