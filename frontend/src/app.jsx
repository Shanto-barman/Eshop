import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Profile from "./pages/profile";
import Products from "./pages/Products";
import Cart from "./pages/cart";
import AuthSuccess from "./pages/AuthSuccess";
// import { UserProvider } from "./context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/Signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/auth-success",
    element: (
      <>
        <AuthSuccess/>
      </>
    ),
  },
  {
    path: "/Verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/Verify/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/Profile/:userId",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/Products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart/>
      </>
    ),
  },
]);

const App = () => {
  return (
   
      <RouterProvider router={router} />   
    
  );
};
export default App;
