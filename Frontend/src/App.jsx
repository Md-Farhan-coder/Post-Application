import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css'
import Home from './Home.jsx'
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Account from './Account.jsx';


function App() {
  
  const route = createBrowserRouter([
    {
       path:"/",
      element: <Home/>,
    },
    {
      path:"/login",
      element: <Login/>,
    },
    {
      path:"/register",
      element: <Register/>,
    },
    {
      path:"/account/:id",
      element: <Account/>,
    }
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
 
}

export default App
