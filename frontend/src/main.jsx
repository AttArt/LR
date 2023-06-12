import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers'

import {BrowserRouter} from "react-router-dom";
// import { CartProvider } from './context/cartcontext';
document.title = 'web temp'

const store = createStore(
  rootReducer
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
  
)
