import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';

const Navbar = () => {
  const {user} = useSelector(store=>store.user)
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logoutHandler = async()=>{
    try {
      const res =await axios.post('http://localhost:8000/api/v1/user/logout',{},{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200 justify-between">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 ">
        <div>
          <img src="/Ecard.png" alt="" className="w-[80px]" />
        </div>
        <nav className="flex gap-10 justify-between items-center ">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>
            {user && (
              <Link to={"/profile"}>
                <li>Hello {user.firstName}</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-pink-400 rounded-full absolute text-white -top-3 -right-5 px-2">
              0
            </span>
          </Link>
          {user ? (
            <Button onClick={logoutHandler} className="bg-pink-600 text-white cursor-pointer hover:border-pink-600 border-1">
              Logout
            </Button>
          ) : (
            <Button onClick={()=>navigate('/login')} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer">
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
