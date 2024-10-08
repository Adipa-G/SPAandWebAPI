import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/bootstrap.scss';
import './scss/app.scss';
import './css/bootstrap-datetimepicker.css';
import './css/font-awesome.min.css';
import './css/idea.css';
import './css/loading-bar.css';

import { Layout } from "./components/layout";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();