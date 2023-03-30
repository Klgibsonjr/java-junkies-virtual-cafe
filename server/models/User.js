const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const drinkSchema = require('./Drink');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true,
        },

        savedDrinks: [drinkSchema],
    },

    {
        toJSON: {
            virtuals: true,
        }
    }
);

// use bcrypt to hash the users password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next()
});

// validate password when user logs in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('drinkCount').get(function () {
    return this.savedDrinks.length;
});

const User = model('User', userSchema);

module.exports = User;