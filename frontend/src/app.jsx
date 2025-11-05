import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './components/ui/Navbar';
import  Home  from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';




const router = createBrowserRouter([
   {
    path:'/Home',
    element :<><Navbar/><Home/></>
  },
  {
    path:'/Signup',
    element:<><Signup/></>
  },
    {
    path:'/login',
    element:<><Login/></>
  }
  ])

  const App = ()=>{
   return( <>
      <RouterProvider router = {router}/>
    </>)
  }
export default App