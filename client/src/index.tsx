import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import redux_thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const store = createStore(rootReducer, applyMiddleware(redux_thunk));
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
