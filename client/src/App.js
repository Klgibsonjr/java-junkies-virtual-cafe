import React from 'react';

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Header from './components/Header';
import SavedDrinks from './pages/SavedDrinks';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      
      <Router>
        <div className='w-full h-screen bg'>
          <div className='overlay'>
            <Header />
            <div>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/saved' element={<SavedDrinks/>} />
              </Routes>
            </div>
          </div>
            <Footer />
        </div>
        
      </Router>
    </ApolloProvider>
  );
}

export default App;
