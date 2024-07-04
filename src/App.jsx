import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import '../src/App.css'
import authservice from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';

import {Header, Footer} from "./Components/index.js"
import { Outlet } from 'react-router-dom';



function App() {
  const [loading,setLoading] = useState(true);
  const dispatch  = useDispatch();

  useEffect(()=>{
    authservice.getCurrUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    })
    .catch((err)=>{
      console.log("user data not found ",err);
    })
    .finally(()=> setLoading(false))
  },[])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className=' w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>  
  ) : null
}

export default App
