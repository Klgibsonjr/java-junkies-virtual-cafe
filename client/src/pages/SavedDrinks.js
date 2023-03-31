import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_DRINK } from '../utils/mutations';
import { saveBookId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedDrinks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeDrink, { error }] = useMutation(REMOVE_DRINK);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteDrink = async (drinkId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeDrink({
        variables: { drinkId },
      });

      // upon success, remove book's id from localStorage
      removeDrinkId(drinkId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s drinks!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedDrinks?.length
            ? `Viewing ${userData.savedDrinks.length} saved ${userData.savedDrinks.length === 1 ? 'drink' : 'drinks'
            }:`
            : 'You have no saved drinks!'}
        </h2>
        <div>
          <Row>
            {userData.savedDrinks?.map((drink) => {
              return (
                <Col md="4">
                  <Card key={drink.drinkId} border="dark">
                    <Card.Body>
                      <Card.Title>{drink.name}</Card.Title>
                      <Card.Text>{drink.description}</Card.Text>
                      <Card.Text>{drink.recipe}</Card.Text>
                      <Card.Text>{drink.yield}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteDrink(drink.drinkId)}
                      >
                        Delete this Drink!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedDrinks;
