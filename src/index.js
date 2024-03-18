import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Blocks from './Blocks';
import Block from './Block';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blocks />
  },
  {
    path: '/blocks',
    element: <Blocks />
  },
  {
    path: '/blocks/:blockHash',
    element: <Block />
  },
])

ReactDOM.render(
  <React.StrictMode>
    <h1 className="page-title">BlockIto Explorer</h1>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

