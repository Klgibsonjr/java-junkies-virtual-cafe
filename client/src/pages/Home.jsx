import React from 'react';
import Header from '../components/Header';
import Playlist from '../components/Playlist';

const Home = () => {
  return (
    <div className='flex flex-col sm:flex w-full gap-2'>
      <Playlist />

      <input
        type='search'
        placeholder='What are drinking today?'
        className='w-full h-full p-2 rounded-md text-xl bg-slate-200'
      />
    </div>
  );
};

export default Home;
