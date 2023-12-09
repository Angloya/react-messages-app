import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { baseRouter } from './router';
import { store } from './store/app';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={baseRouter}/>
        </Provider>
    </React.StrictMode>
);
