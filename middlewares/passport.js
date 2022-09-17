const AuthSchema = require("../models/AuthModel");
const { JWT_SECRET } = require("../Config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");


const Options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(Options, async (payload, done) => {
        console.log(payload);
    let user=  await AuthSchema.findById(payload.id).lean()
          if (user) {
            return done(null, user);
          }
          return done(null, false);
          
        })
        );
    };

   