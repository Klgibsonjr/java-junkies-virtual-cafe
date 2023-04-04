import React, { useState, useEffect } from 'react';

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
        <div className="text-white bg-coffee p-5">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Search for Drinks!</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 mb-3 md:mr-3">
                  <input
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for a drink"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg md:w-auto md:ml-2 hover:bg-blue-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    
        <div className="max-w-7xl mx-auto py-5">
          <h2 className="text-white text-3xl font-bold mb-5">
            {searchedDrinks.length
              ? `Viewing ${searchedDrinks.length} results:`
              : 'Search for a drink to begin'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchedDrinks.map((drink) => {
              return (
                <div key={drink.name} className="bg-card rounded-lg shadow-md">
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{drink.name}</h3>
                    <p className="text-gray-500 mb-4">{drink.description}</p>
                    <h4 className="text-lg font-bold mb-2">Ingredients:</h4>
                    {drink.recipe.ingredients.map((ingredient) => {
                      return <p key={ingredient.name}>{ingredient.quantity} {ingredient.name}</p>;
                    })}
                    <h4 className="text-lg font-bold mb-2">Instructions:</h4>
                    {drink.recipe.instructions.map((instruction) => {
                      return <p key={instruction}>{instruction}</p>;
                    })}
                    {Auth.loggedIn() && (
                      <button
                        disabled={savedDrinkIds?.some(
                          (savedId) => savedId === drink.name
                        )}
                        className="w-full px-4 py-2 text-white bg-gray-800 hover:bg-blue-500 rounded-lg mt-4"
                        onClick={() => handleSaveDrink(drink.name)}
                      >
                        {savedDrinkIds?.some((savedId) => savedId === drink.name)
                          ? 'Drink Already Saved!'
                          : 'Save This Drink!'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
};

export default SearchDrinks;