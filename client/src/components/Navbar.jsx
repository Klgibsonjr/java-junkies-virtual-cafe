import React from 'react';
import logo from '../assests/images/java_logo.png';
import { Link } from 'react-router-dom';
import Auth from '../utils/Auth';

const Navbar = () => {
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
          {Auth.loggedIn() ? (
                <>
                  <div>
                  <Link to='/saved'>Saved Drinks</Link>
                  </div>
                  <Link onClick={Auth.logout}>Logout</Link>
                </>
              ) : (
                <div className='flex gap-4 mr-8'>
                <div className='text-slate-100 text-md sm:text-xl font-bold'>
                  <Link to='/login'>Login</Link>
                </div>
                <div className='text-slate-100 text-md sm:text-xl font-bold'>
                  <Link to='/signup'>Sign Up</Link>
                </div>
              </div>
              )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
