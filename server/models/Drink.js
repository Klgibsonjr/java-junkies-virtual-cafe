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
    recipe: {
        ingredients: [
            {
                name: {type: String, required: true},
                quantity: {type: String, required: true},
            }
        ],
        instructions: [{type: String, required: true}],
    },
    yield: {
        type: String,
        required: true,
    },
});

module.exports = drinkSchema