import React, { useRef } from 'react';
import Header from '../components/Header';
import SearchDrinks from './SearchDrinks';


const Home = () => {
  return (
    <div className='flex flex-col sm:flex w-full gap-2'>
      <SearchDrinks />
    </div>
  );
};

export default Home;
