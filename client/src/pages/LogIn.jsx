import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/Auth';

const LogIn = () => {
  const formInputValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(formInputValues);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [validated] = useState(false);
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
    <div>
      <form
        onSubmit={handleFormSubmit}
        className='w-auto my-10 mx-10 md:w-[75vh] md:mx-auto '
      >
        <div className='mb-6'>
          <label className='block m-2 text-lg font-medium text-gray-900 dark:text-white'>
            Username
          </label>
          <input
            type='text'
            name='username'
            placeholder='Enter username here'
            value={formValues.username}
            onChange={handleInputChange}
            className='bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <p className='text-md text-red-700'>{formErrors.username}</p>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block m-2 text-lg font-medium text-gray-900 dark:text-white'
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            value={formValues.password}
            onChange={handleInputChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <p className='text-md text-red-700'>{formErrors.password}</p>
        <div className='flex items-start mb-6'>
          <div className='flex items-center h-5'></div>
        </div>

        <button
          type='submit'
          onClick={handleFormSubmit}
          className='text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogIn;