const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedDrinks: [Drink]
    }   

    type Drink {
        drinkId: ID!
        name: String!
        description: String!
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        user: [User] 
        drink(name: )
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }

`

module.exports = typeDefs;