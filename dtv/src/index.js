import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Web3state from './Context/web3states';

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(

  <BrowserRouter>
    <Web3state>
      <App />
    </Web3state>
  </BrowserRouter>,
);
reportWebVitals();