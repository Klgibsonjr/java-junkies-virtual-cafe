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
import { saveDrinkIds, getSavedDrinkIds } from '../utils/localStorage';

import Auth from '../utils/Auth';

const SearchDrinks = () => {
    const [searchedDrinks, setSearchDrinks] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedDrinkIds());

    const [saveDrink, { error }] = useMutation(SAVE_DRINK);

    useEffect(() => {
        return () => saveDrinkIds(savedDrinkIds);
    });

    const handleFormSubmit = async (e) => {
       e.preventDefault();
       
       if (!searchInput) {
        return false;
       }

       try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'the-coffee-api.p.rapidapi.com'
          }
        };
        
        const response = await fetch(
            `https://the-coffee-api.p.rapidapi.com/drinks/${searchInput}?keys=description%2Crecipe`, options
        );

        if (!response.ok) {
            throw new Error('an error occured');
        }

        const items  = await response.json();

        const drinkData = items.map((drink) => ({
            name: drink.name,
            description: drink.description,
            recipe: drink.recipe
        }));

        setSearchDrinks(drinkData);
        setSearchInput('');

       } catch (err) {
        console.error(err);
       }
    };

    const handleSaveDrink = async (name) => {
        const drinkToSave = searchedDrinks.find((drink) => drink.name === name);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await saveDrink({
                variables: { drinkData: { ...drinkToSave } },
            });
            console.log(`data: ${data}`);
            setSavedDrinkIds([...savedDrinkIds, drinkToSave.name]);

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
                    <Card key={drink.name} border="dark" className='mb-3'>
                    <Card.Body>
                      <Card.Title>{drink.name}</Card.Title>
                      <Card.Text>{drink.description}</Card.Text>
                      <Card.Text>Ingredients</Card.Text>
                      {drink.recipe.ingredients.map((ingredient) => {
                        return (
                            <p>{ingredient.name}</p>
                        )
                      })}
                      <Card.Text>Instructions</Card.Text>
                      {drink.recipe.instructions.map((instruction) => {
                        return (
                            <p>{instruction}</p>
                        )
                      })}
                        {Auth.loggedIn() && (
                          <Button
                            disabled={savedDrinkIds?.some(
                              (savedId) => savedId === drink.name
                            )}
                            className="btn-block btn-info"
                            onClick={() => handleSaveDrink(drink.name)}
                          >
                            {savedDrinkIds?.some((savedId) => savedId === drink.name)
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