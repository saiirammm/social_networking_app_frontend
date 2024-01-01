import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import {BrowserRouter} from 'react-router-dom'

const store = configStore()
store.subscribe(()=>{
  console.log(store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
