import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CategoryContextProvider } from './context/categoryContext';
import { TaskContextProvider } from './context/taskContext';
import { AuthContextProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CategoryContextProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </CategoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


