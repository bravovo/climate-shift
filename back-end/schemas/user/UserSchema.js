const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    lat: {
        type: Number,
        required: true,
        unique: false,
    },
    lng: {
        type: Number,
        required: true,
        unique: false
    },
    lang: {
        type: String,
        unique: false,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) {
    try {
        const emailExists = await mongoose.models.Users.findOne({ email: this.email });
        if (emailExists && emailExists._id.toString() !== this._id.toString()) {
            throw new Error('Email already in use');
        }
    } catch (error) {
        next(error);
    }

    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

module.exports = User;