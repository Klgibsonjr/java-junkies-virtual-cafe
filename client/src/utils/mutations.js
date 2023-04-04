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
  mutation saveDrink($drinkData: drinkInput!) {
    saveDrink(drinkData: $drinkData) {
        _id
        username
        email
        savedDrinks {
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
  mutation removeDrink($name: String!) {
    removeDrink(name: $name) {
        _id
        username
        email
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