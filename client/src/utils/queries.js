import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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