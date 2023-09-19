import React from 'react'
import { useContext } from 'react';
import { Store } from '../Store';
import { Link, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping , faUser , faWrench , faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <nav>
          <Link to="/">
            <div className='logo'>
              <img  src="https://see.fontimg.com/api/renderfont4/x3JyK/eyJyIjoiZnMiLCJoIjoyOCwidyI6MTAwMCwiZnMiOjI4LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RkFTSU9O/sellena-brush.png" alt="" />
            </div>
          </Link>
          <ul className='ul-1'>
              <li><a href="/">HOME</a></li>
              <li><a href="/products/shop">SHOP</a></li>
              <li>
                <a href="">CATEGORY</a>
                <ul>
                <li><a href="/products/women-fashion">WOMEN'S</a></li>
                <li><a href="/products/menfashion">MEN'S</a></li>
                <li><a href="/products/glasses-hat">GRASSES & HAT</a></li>
                </ul>
              </li>
              <li><a href="">CONTACT</a></li>
          </ul>
          <ul className='ul-2'> 
              <li className='li2'>
                <a class="active" href="#">
                    {<Link to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} size='l' />
                    {cart.cartItems.length > 0 && (
                      <span className='span-num'>
                        {cart.cartItems.length}
                      </span>
                    )}
                    </Link>}
                  </a>
                </li>
                {userInfo ?  
                <li>
                  <a href="#"><FontAwesomeIcon icon={faUser} size='l' /><i class="fas fa-caret-down"></i></a>
                  <ul>
                    <li><a href="/order-history">order</a></li>
                    <li><a onClick={signoutHandler}>sigout</a></li>
                  </ul>
                </li>
                : <li><a href="/signin"><FontAwesomeIcon icon={faUser}  size='l' /></a></li>
                }
                {userInfo && userInfo.isAdmin && (
                  <li className='admin-icon'>
                    <a href="#"><FontAwesomeIcon icon={faWrench} />
                      <i class="fas fa-caret-down"></i>
                    </a>
                    <ul>
                      <li><a href="/admin/dashboard">dashboard</a></li>
                      <li><a href="/admin/order-list">order</a></li>
                      <li><a href="/admin/product-list">product</a></li>
                    </ul>
                  </li>
              )}
              
          </ul>
      </nav>
  )
}




export default Navbar