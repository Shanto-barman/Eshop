import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/><Footer/></>
   
  },
  {
    path: "/Signup",
    element: 
      <>
        <Signup />
      </>
    
  },
  {
    path: "/login",
    element: 
      <>
        <Login />
      </>
    
  },
  {
    path: "/Verify",
    element: 
      <>
        <Verify />
      </>
    
  },
  {
    path: "/Verify/:token",
    element: 
      <>
        <VerifyEmail />
      </>
   
  },
    {
    path: "/Profile",
    element: 
      <><Navbar/><Profile/></>
   
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
