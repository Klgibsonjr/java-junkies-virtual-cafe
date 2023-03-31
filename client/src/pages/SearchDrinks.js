import React, { useState, useEffect } from 'react';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
  } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_DRINK } from '../utils/mutations';
import { saveDrinkId, getSavedDrinkId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchDrinks = () => {
    const [searchedDrinks, setSearchDrinks] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedDrinkId());

    const [saveDrink, { error }] = useMutation(SAVE_DRINK);

    useEffect(() => {
        return () => savedDrinkIds(savedDrinkIds);
    });

    const handleFormSubmit = async (e) => {
       e.preventDefault();
       
       if (!searchInput) {
        return false;
       }

       try {
        const response = await fetch(
            `https://the-coffee-api.p.rapidapi.com/drinks/${searchInput}?keys=`
        );

        if (!response.ok) {
            throw new Error('an error occured');
        }

        const { items } = await response.json();

        const drinkData = items.map((drink) => ({
            drinkId: drink.id,
            name: drink.name,
            description: drink.description,
        }));

        setSearchDrinks(drinkData);
        setSearchInput('');

       } catch (err) {
        console.error(err);
       }
    };

    const handleSaveDrink = async (drinkId) => {
        const drinkToSave = searchedDrinks.find((drink) => drink.drinkId === drinkId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await saveDrink({
                variables: { drinkData: { ...drinkToSave } },
            })
            console.log(saveDrinkId);
            setSavedDrinkIds([...savedDrinkIds, drinkToSave.drinkId]);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
          <div className="text-light bg-dark p-5">
            <Container>
              <h1>Search for Drinks!</h1>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name="searchInput"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type="text"
                      size="lg"
                      placeholder="Search for a drink"
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button type="submit" variant="success" size="lg">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
    
          <Container>
            <h2 className='pt-5'>
              {searchedDrinks.length
                ? `Viewing ${searchedDrinks.length} results:`
                : 'Search for a drink to begin'}
            </h2>
            <Row>
              {searchedDrinks.map((drink) => {
                return (
                  <Col md="4">
                    <Card key={drink.drinkId} border="dark" className='mb-3'>
                      {drink.image ? (
                        <Card.Img
                          src={drink.image}
                          alt={drink.name}
                          variant="top"
                        />
                      ) : null}
                      <Card.Body>
                        <Card.Title>{drink.name}</Card.Title>
                        <p className="small">Drink: {drink.name}</p>
                        <Card.Text>{drink.description}</Card.Text>
                        {Auth.loggedIn() && (
                          <Button
                            disabled={savedDrinkIds?.some(
                              (savedId) => savedId === drink.drinkId
                            )}
                            className="btn-block btn-info"
                            onClick={() => handleSaveDrink(drink.drinkId)}
                          >
                            {savedDrinkIds?.some((savedId) => savedId === drink.drinkId)
                              ? 'Drink Already Saved!'
                              : 'Save This Drink!'}
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      );
};

export default SearchDrinks;