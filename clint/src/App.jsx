import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails'

function App() {
  
  



  return (
    <>
    
    <main className='min-h-[82vh]'>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    
    </>

  )
}

export default App
