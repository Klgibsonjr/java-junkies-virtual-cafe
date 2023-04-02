import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_DRINK = gql`
  mutation saveDrink($drinkData: DrinkInput!) {
    saveDrink(drinkData: $drinkData) {
        _id
        username
        email
        password
        savedDrinks {
            drinkId
            name
            description
            recipe {
                ingredients {
                    name
                    quantity
                }
                instructions
                yield
            }
          }
        }
      }
`;

export const REMOVE_DRINK = gql`
  mutation removeDrink($drinkId: ID!) {
    removeDrink(drinkId: $drinkId) {
        _id
        username
        email
        password
        savedDrinks {
            drinkId
            name
            description
            recipe {
                ingredients {
                    name
                    quantity
                }
                instructions
                yield
            }
          }
        }
      }
`;