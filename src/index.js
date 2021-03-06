import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import Boggle from "./components/Boggle";
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducerManager from "./reducers/reducer_manager";

const store = createStore(
    reducerManager,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
ReactDOM.render(
    <Provider store={store}>
    <Boggle/>
    </Provider>    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
