require('dotenv').config();

const userModel = require('../models/userModel'),
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport'),
    bcrypt = require('bcryptjs'); // Pour hasher le mot de passe

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_PASS
};

exports.localStrategy = new LocalStrategy({usernameField: 'username'}, async (username, password, done) => {
    console.log("localStrategy");
    console.log(username);

    const user = await userModel.findOne({ username: username }).exec();

    if (!user) return done(null, false, 'Error in username or password');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return done(null, false, 'Error in username or password');

    return done(null, user);
});

exports.jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log("jwtStrategy", payload);

    const user = await userModel.findById(payload._id);

    if (!user) return done(null, false);

    return done(null, user);
});

exports.checkIsAuth = (req, res, next) => {
    if (req.originalUrl.includes(process.env.API_PATH)){
        passport.authenticate('jwt', {session: false})(req, res, next);
    } else {
        next();
    }
};