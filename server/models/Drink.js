const { Schema } = require('mongoose');

const drinkSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

module.exports = drinkSchema