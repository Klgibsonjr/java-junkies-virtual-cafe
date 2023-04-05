const drinks = [
    {
        name: 'Iced Coffee',
        description: 'Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee normally and then serving it over ice or in cold milk or by brewing the coffee cold.',
        recipe: {
            ingredients: [
                {
                    name: 'ground coffee',
                    quantity: '1 lb.',
                },
                {
                    name: 'cold water',
                    quantity: '8 qt.'
                },
                {
                    name: 'half-and-half',
                    quantity: '1 splash'
                }
            ],
            instructions: [
                'Mix ground coffee with water in a large container. Cover and allow to sit at room temperature for at least 12 hours.',
                'Line a strainer with cheesecloth and set over a pitcher or other container. Pour coffee/water mixture through the strainer, allowing all liquid to run through. Discard grounds.',
                'Place coffee liquid in the fridge and allow to cool.',
                'Pack a glass full of ice cubes. Fill glass 2/3 full with coffee liquid. Add splash of half-and-half.'
            ],
            yield: '24 servings'
        },
    },
    {
        name: 'Cappuccino',
        description: 'Cappuccino is an Italian coffee drink that is traditionally made with equal parts espresso, steamed milk, and milk foam. It is often served with a sprinkle of cocoa powder or cinnamon on top.',
        recipe: {
            ingredients: [
                {
                    name: 'espresso',
                    quantity: '1 shot'
                },
                {
                    name: 'milk',
                    quantity: '1/3 cup'
                },
                {
                    name: 'milk foam',
                    quantity: '1/3 cup'
                },
                {
                    name: 'cocoa powder or cinnamon',
                    quantity: 'a pinch'
                }
            ],
            instructions: [
                'Brew a shot of espresso and pour into a cappuccino cup.',
                'Steam milk and milk foam together, making sure the milk reaches a temperature of around 150°F (65°C).',
                'Pour the milk and foam mixture into the cappuccino cup, holding back the foam with a spoon.',
                'Spoon the foam on top of the milk, making sure to leave a little space at the top of the cup.',
                'Sprinkle cocoa powder or cinnamon on top, if desired.'
            ],
            yield: '1 serving'
        }
    },
    {
        name: 'Latte',
        description: 'A latte is a coffee drink made with espresso and steamed milk. It is similar to a cappuccino, but has more milk and less foam.',
        recipe: {
            ingredients: [
                {
                    name: 'espresso',
                    quantity: '1-2 shots'
                },
                {
                    name: 'milk',
                    quantity: '1 cup'
                },
                {
                    name: 'sugar (optional)',
                    quantity: 'to taste'
                }
            ],
            instructions: [
                'Brew 1-2 shots of espresso and pour into a latte glass.',
                'Steam milk until it reaches a temperature of around 150°F (65°C).',
                'Pour the milk into the latte glass, holding back the foam with a spoon.',
                'Spoon the foam on top of the milk, making sure to leave a little space at the top of the glass.',
                'Add sugar, if desired.'
            ],
            yield: '1 serving'
        }
    }
];

export default drinks;