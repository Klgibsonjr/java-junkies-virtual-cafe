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
import { removeDrinkId } from '../utils/localStorage';

import Auth from '../utils/Auth';

const SavedDrinks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeDrink, { error }] = useMutation(REMOVE_DRINK);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteDrink = async (name) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeDrink({
        variables: { name },
      });

      // upon success, remove book's id from localStorage
      removeDrinkId(name);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-slate-100 bg-coffee p-5'>
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Viewing {userData.username}'s drinks!</h1>
        </div>
      </div>
  
      <div className="container mx-auto pt-5">
        <h2 className='text-slate-100 text-2xl sm:text-3xl font-bold mb-5'>
          {userData.savedDrinks?.length
            ? `Viewing ${userData.savedDrinks.length} saved ${userData.savedDrinks.length === 1 ? 'drink' : 'drinks'
            }:`
            : 'You have no saved drinks!'}
        </h2>
        <div className="flex flex-wrap -mx-2">
          {userData.savedDrinks?.map((drink) => (
            <div className='bg-card rounded-lg shadow-md' key={drink.name}>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{drink.name}</h3>
                <p className='text-gray-800 mb-4'>{drink.description}</p>
  
                <h4 className="font-bold mb-2">Ingredients</h4>
                <ul className="mb-4 list-disc list-inside">
                  {drink.recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.name}>{ingredient.quantity} {ingredient.name}</li>
                  ))}
                </ul>
  
                <h4 className="font-bold mb-2">Instructions</h4>
                <ol className="mb-4 list-decimal list-inside">
                  {drink.recipe.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ol>
  
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-2"
                  onClick={() => handleDeleteDrink(drink.name)}
                >
                  Delete this Drink!
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ); 
};

export default SavedDrinks;
