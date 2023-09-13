import React from 'react';
import img1 from '../img/pexels-juan-mendez-1536619.jpg';
import { Link } from "react-router-dom";


const HomeList = () => {
  return (
    <div className='Home-list'>
      <div className='category-all'>
        <img src="https://images.pexels.com/photos/1839904/pexels-photo-1839904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""></img>
        <div className='text'>
          <h1>WOMEN FASHION</h1>
          <div className='shop'>
            <div className='s1'>
            <Link to={`/products/women-fashion`}><a href="/">SHOP NOW</a></Link>
            </div>
          </div>
        </div>
      </div>
      <div className='category-all'>
        <img src="https://images.pexels.com/photos/952629/pexels-photo-952629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className='text'>
          <h1>GRASSES & HAT</h1>
          <div className='shop'>
            <div className='s1'>
             <Link to={`/products/glasses-hat`}><a href="/">SHOP NOW</a></Link>
            </div>
          </div>
        </div>
      </div>
      <div className='category-all'>
        <img src="https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className='text'>
          <h1>MEN FASHION</h1>
          <div className='shop'>
            <div className='s1'>
            <Link to={`/products/menfashion`}><a href="/">SHOP NOW</a></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeList