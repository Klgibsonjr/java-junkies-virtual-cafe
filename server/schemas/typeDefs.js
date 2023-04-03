const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    savedDrinks: [Drink]
    }   

    type Drink {
        drinkId: ID
        name: String!
        description: String!
        recipe: Recipe
    }

    type Recipe {
        ingredients: [Ingredients]
        instructions: [String]
        yield: String
    }

    type Ingredients {
        name: String
        quantity: String
    }

    input IngredientInput {
      name: String
      quantity: String
    }

    input RecipeInput {
        ingredients: [IngredientInput]
        instructions: [String]
        yield: String
      }

    input drinkInput {
        name: String!
        drinkId: ID
        description: String!
        recipe: RecipeInput
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveDrink(drinkData: drinkInput!): User
        removeDrink(name: String!): User
    }

`

module.exports = typeDefs;