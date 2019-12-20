// render the root to the dom
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// development only axios helpers
import axios from 'axios';
window.axios = axios;

// function that allows us to initiate redux store. 
// empty array to start , server-side param, applyMiddleware()
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);

console.log('stripe key is', process.env.REACT_APP_STRIPE_KEY);