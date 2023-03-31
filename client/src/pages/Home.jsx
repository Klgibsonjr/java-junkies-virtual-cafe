import React from 'react';
import Header from '../components/Header';
import Playlist from '../components/Playlist';
import SearchDrinks from './SearchDrinks';

const Home = () => {
  return (
    <div className='flex flex-col sm:flex w-full gap-2'>
      <Playlist />
      <SearchDrinks />
    </div>
  );
};

export default Home;
