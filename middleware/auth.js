const passport = require("passport")
const passportJWT = require('passport-jwt')
const User = require('../model/model')

passport.use(
    new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "SECRET_KEY"
    },
        function(jwtPayload, done) {
            return User.findById(jwtPayload.id)
                .then( user => {
                    return done(null, user)
                })
                .catch((error) => {
                    return done(error)
                })
        }
    )
)

const authMiddleware = {};

authMiddleware.authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Stocker les informations d'authentification dans l'objet de demande
    req.user = user;

    // Poursuivre vers la prochaine étape de la chaîne de middleware
    next();
  })(req, res, next);
};

module.exports = authMiddleware;
