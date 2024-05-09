import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { nav } from '../data/Data';
import Category from './Category';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../redux/CartSlice';
const Header = () => {
  const dispatch = useDispatch();
  const {totalItems} = useSelector((state)=> state.cart);
  const [isSticky, setIsSticky] = useState(false);
  const[toggler,setToggler] = useState(false);
  useEffect(()=>{
    dispatch(getCartTotal);
    window.addEventListener("scroll",handleScroll);
    return ()=>{
     window.removeEventListener("scroll",handleScroll);
    }
  },[]);
  const handleScroll = () =>{
    if(window.scrollY>100){
      setIsSticky(true);
    }else{
      setIsSticky(false);
    }
  }

  return (
    <div>
     {/* <TopBar /> */}
      <div className={`container-fluid bg-dark-262c31 mb-30 ${isSticky? "sticky-header" : ""}`}>
        <div className='row px-xl-5'>
       <Category/>
        <div className='col-lg-9'>
          <nav className='navbar navbar-expand-lg bg-dark-262c31 navbar-dark py-3 py-lg-0 px-0'>
          <Link className="text-decoration-none d-block d-lg-none" to="/">
            <span className="h1 text-uppercase text-primary bg-dark px-2">Shop</span>
            <span className="h1 text-uppercase text-dark bg-primary px-2  ml-n1">Nest </span>
          </Link>
          <button type='button' onClick={() => setToggler(!toggler)} className='navbar-toggler'>
  <span className="navbar-toggler-icon"></span>
</button>

          <div className={toggler ? "toggler navbar-collapse justify-content-between":"navbar-collapse justify-content-between collapse"}>
            <div className="navbar-nav mr-auto py-0">
              {nav.slice(0,4).map((val,index)=>(
                     <Link className="nav-link nav-item" to={val.path} key={index}>{val.text}</Link>
              ))}
            </div>
            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
            <Link className='btn px-0 ml-2'>
              <i className='fas fa-heart text-white'></i>
              <span style={{paddingBottom: "2px"}} className='badge text-white border border-dark rounded-circle'>0</span>
            </Link>
            <Link  to='/cart'  className='btn px-0 ml-2 '>
              <i className='fas fa-shopping-cart text-white'></i>
              <span style={{paddingBottom: "2px"}} className='badge text-white border border-dark rounded-circle'>{totalItems}</span>
            </Link>
          </div>
          </div>
          </nav>
        </div>
        </div>
    
      </div>
     
    </div>
  )
}

export default Header
