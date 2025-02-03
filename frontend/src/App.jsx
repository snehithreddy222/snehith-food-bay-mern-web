import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Hut from './pages/Hut/Hut'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/loginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/myOrders/myOrders'





const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin ={setShowLogin}/>
      
      <Routes>
        <Route path='/' element={<Hut/>} />
        <Route path='/Cart' element ={<Cart/>} />
        <Route path = '/order' element ={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path ='/myorders' element={<MyOrders/>} />
        
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
