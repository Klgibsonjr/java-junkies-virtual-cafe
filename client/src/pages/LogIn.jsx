import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/Auth';

const LogIn = () => {
  const formInputValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(formInputValues);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...formValues },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormValues({
      username: '',
      password: '',
    });
  };

  return (
    <div className='flex flex-col items-center mt-10'>
      <h2 className='text-3xl sm:text-5xl font-bold mb-4 text-slate-100 drop-shadow-xl'>
        Login{' '}
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
            value={formValues.username}
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
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline'
          type='submit'
          disabled={!(formValues.username && formValues.password)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
