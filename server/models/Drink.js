const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
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
        yield: {
            type: String,
        }
    },
});

const Drink = model('Drink', drinkSchema);

module.exports = drinkSchema