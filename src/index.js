import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Template from './template/Template'
import Menu from './template/Menu'
import Footer from './template/Footer'

ReactDOM.render(
  <React.StrictMode>
    <Menu/>
    <Template/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
