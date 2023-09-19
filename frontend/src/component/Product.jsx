import axios from 'axios';
import React from 'react'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';

const Product = ({item}) => {
  return (
    <div className='product-container' data-aos="fade-left" data-aos-duration="2500">
      <Link to={`/product/${item.slug}`}  className='text'>
        <div className='product'>
            {
              item.countInStock < 6 &&          
              (<div className='stock'><h1>{item.countInStock} in stock</h1></div>)
            }
            <div className='img-ctn'>
              <img src={item.images[0]}  alt={item.name} className='img1'/>
              <div className='img2-ctn'>
                <img src={item.images[1]}  alt={item.name} className='img1'/>
              </div>
            </div>
            <div className='text1'>
              <h1>{item.name}</h1>
              <p>฿ {item.price}</p>
            </div>
          </div>
      </Link>
    </div>
  )
}

export default Product