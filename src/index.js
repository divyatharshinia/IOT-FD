import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside createRoot
root.render(
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode> */}
);
