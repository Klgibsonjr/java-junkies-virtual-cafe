import React, { useState, useEffect } from 'react';

// hello world!
import { useMutation } from '@apollo/client';
import { SAVE_DRINK } from '../utils/mutations';
import { saveDrinkIds, getSavedDrinkIds } from '../utils/localStorage';
import drinks from '../assests/data/seed';

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

    // COMMENTING API CALL OUT SINCE IT IS RETURNING 503 ERRORS. 
    // USING SEED DATA UNTIL API IS WORKING AGAIN.
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      //     'X-RapidAPI-Host': 'the-coffee-api.p.rapidapi.com',
      //   },
      // };

      // const response = await fetch(
      //   `https://the-coffee-api.p.rapidapi.com/drinks/${searchInput}?keys=description%2Crecipe`,
      //   options
      // );

      // if (!response.ok) {
      //   throw new Error('an error occured');
      // }

      // const items = await response.json();

      // const items = drinks

      const items = drinks.filter((drink) =>
      drink.name.toLowerCase().includes(searchInput.toLowerCase())
    );

      const drinkData = items.map((drink) => ({
        name: drink.name,
        description: drink.description,
        recipe: drink.recipe,
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
      <div className='text-slate-100 bg-coffee p-5'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl font-bold mb-4'>Search for Drinks!</h1>
          <form onSubmit={handleFormSubmit}>
            <div className='flex flex-col md:flex-row'>
              <div className='flex-1 mb-3 md:mr-3'>
                <input
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Search for a drink'
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline md:w-auto md:ml-2 '
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='max-w-7xl mx-auto py-5'>
        <h2 className='text-slate-100 text-2xl sm:text-3xl font-bold mb-5'>
          {searchedDrinks.length > 0 && `Viewing ${searchedDrinks.length} results:`}
        </h2>
        <div className='grid grid-rows-1 gap-4'>
          {searchedDrinks.map((drink) => {
            return (
              <div key={drink.name} className='bg-card rounded-lg shadow-md m-2'>
                <div className='p-4'>
                  <h3 className='text-xl font-bold mb-2'>{drink.name}</h3>
                  <p className='text-gray-800 mb-4'>{drink.description}</p>
                  <h4 className='font-bold mb-2'>Ingredients:</h4>
                  <ul className="mb-4 list-disc list-inside">
                  {drink.recipe.ingredients.map((ingredient) => {
                    return (
                      <li key={ingredient.name}>
                        {ingredient.quantity} {ingredient.name}
                      </li>
                    );
                  })}
                  </ul>
                  <h4 className='font-bold mb-2'>Instructions:</h4>
                  <ol className="mb-4 list-decimal list-inside">
                    {drink.recipe.instructions.map((instruction) => {
                      return <li key={instruction}>{instruction}</li>;
                    })}
                  </ol>
                  
                  {Auth.loggedIn() && (
                    <button
                      disabled={savedDrinkIds?.some(
                        (savedId) => savedId === drink.name
                      )}
                      className='w-full px-4 py-2 text-white bg-gray-800 hover:bg-blue-500 rounded-lg mt-4'
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
