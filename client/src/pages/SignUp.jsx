import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/Auth';

const SignUp = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className='flex flex-col items-center mt-10'>
      <h2 className='text-3xl sm:text-5xl font-bold mb-4 text-slate-100 drop-shadow-xl'>
        Sign Up
      </h2>
      <form className='w-1/2' onSubmit={handleFormSubmit}>
        <div className='mb-4'>
          <label
            className='block text-slate-100 font-bold mb-2 drop-shadow-xl '
            htmlFor='username'
          >
            Username
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            name='username'
            type='text'
            placeholder='Enter username'
            value={userFormData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-slate-100 font-bold mb-2 drop-shadow-2xl'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            name='email'
            type='email'
            placeholder='Enter email address'
            value={userFormData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-slate-100 font-bold mb-2 drop-shadow-xl'
          >
            Password
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            value={userFormData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline'
          type='submit'
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
