import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../../pages/Cart/Cart';
import { storeContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu,Setmenu] = useState("home");
    const {getTotalCartAmount,token,setToken} = useContext(storeContext);
    const navigate = useNavigate();
    const logOut = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>Setmenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>Setmenu("menu")}className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>Setmenu("mobile-app")}className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>Setmenu("contact-us")}className={menu==="contact-us"?"active":""}>contact-us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
            
            <div className={getTotalCartAmount() === 0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/MyOrders')}><img src={assets.bag_icon} alt="" /><p></p>Orders</li>
            <hr />
            <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
          </div>}
        
      </div>
      
    </div>
  )
}

export default Navbar
