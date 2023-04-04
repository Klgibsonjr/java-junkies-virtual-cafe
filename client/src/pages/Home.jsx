import React, { useRef } from 'react';
import Header from '../components/Header';
import Playlist from '../components/Playlist';
import SearchDrinks from './SearchDrinks';
import KofiButton from "kofi-button"

const Home = () => {
  return (
    <div className='flex flex-col sm:flex w-full gap-2'>
      <Playlist />
      <SearchDrinks />
      <KofiButton color="#5cb85c" title="Tip Us" kofiID="E1E6K2G78" />
    </div>
  );
};

export default Home;
