import { useState } from 'react'
import './App.css'
import User from "./getUsers/User.jsx"


import {RouterProvider,createBrowserRouter} from "react-router-dom";
import AddUser from './addUser/AddUser.jsx';
import UpdateUser from './updateUser/UpdateUser.jsx';


function App() {

  const route=createBrowserRouter([{
    path:"/",
    element:<User/>
  },
  {
    path:"/add",
    element:<AddUser/>

  },
  { 
    path:"/update/:id",
    element:<UpdateUser/>
  }
])


  return (
    <>
   <RouterProvider router={route} > </RouterProvider>
  
    </>
  )
}

export default App
