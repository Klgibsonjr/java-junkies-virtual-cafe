import React from 'react';
import logo from '../assests/images/java_logo.png';

const Header = () => {
  return (
    <header>
      <nav className='flex w-full justify-between '>
        <div className='flex justify-between w-full'>
          <a className='flex ml-4' href='/'>
            <img
              src={logo}
              alt='Java Junkies Logo'
              className='w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]'
            />
            <div className='flex flex-col'>
              <h1 className='text-slate-100 text-xl sm:text-4xl mt-2 font-bold'>
                Java Junkies
              </h1>
              <p className='text-slate-100 text-sm sm:text-xl font-bold text-center'>
                A Virtual Cafe :)
              </p>
            </div>
          </a>
          <div className='flex gap-4 mr-8'>
            <button className='text-slate-100 text-md sm:text-xl font-bold'>
              Login
            </button>
            <button className='text-slate-100 text-md sm:text-xl font-bold'>
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
