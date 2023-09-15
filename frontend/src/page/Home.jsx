import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductFilter from "../component/ProductFilter";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import HomeList from "../component/HomeList";



const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const Home = () => {
  
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  return (
    <div className='home-container'>
      <HomeList/>
      <div className="products">
        <div className="new-product">
          <h1><span>NEW</span> PRODUCT</h1>
        </div>
          <ProductFilter />
      </div>   
    </div>
  )
}

export default Home