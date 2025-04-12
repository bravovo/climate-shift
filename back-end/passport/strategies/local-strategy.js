const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../schemas/user/UserSchema');
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => { 
    console.log("SERIALIZE USER --------------------------------------------------");
    try {
        done(null, user.id);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
});

passport.deserializeUser(async (userId, done) => { 
    console.log("DESERIALIZE USER --------------------------------------------------");
    try {
        const user = await User.findById(userId);

        if (!user) {
            console.log('USER NOT FOUND');
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
});

passport.use(new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
    console.log("CREATING SESSION USER ------------------------------------------------");
    try {
        const user = await User.findOne({ email: username });

        if (!user) {
            console.log('USER NOT FOUND');
            return done(null, false);
        }

        const matchedPasswords = await bcrypt.compare(password, user.password);

        if (matchedPasswords) {
            done(null, user);
        } else {
            console.log("INVALID PASSWORD");
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        console.log(error);
        done(error, null);
    }
}));

module.exports = passport;