import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore,applyMiddleware } from 'redux';
import reducer from './store/Reducer/index'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import KeyboardEventHandler from 'react-keyboard-event-handler';
const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
store.subscribe(() => {
  // When state will be updated(in our case, when items will be fetched), 
  // we will update local component state and force component to rerender 
  // with new data.
  console.log(store.getState())
  
     
});


ReactDOM.render( 
  <KeyboardEventHandler
    handleKeys={['F1']}
    onKeyEvent={(key, e) =>  {
        e.preventDefault();
        e.stopPropagation();
      }} > 
<Provider store={store}>
    <App />
  </Provider></KeyboardEventHandler>,
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
