const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../schemas/user/UserSchema');
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => { 
    try {
        done(null, user.id);
    } catch (error) {
        done(error, null);
    }
});

passport.deserializeUser(async (userId, done) => { 
    try {
        const user = await User.findById(userId);

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username });

        if (!user) {
            return done(null, false);
        }

        const matchedPasswords = await bcrypt.compare(password, user.password);

        if (matchedPasswords) {
            done(null, user);
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport;