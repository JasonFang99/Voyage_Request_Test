import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserTree from './UserTree'
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root'));

const AUTH_TOKEN = 'Token %s3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f';

// axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu'; //'http://127.0.0.1:8000'//
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.post('/voyage/', {

//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
