import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Product from './Product';
import { publicRequest } from "../requestMethod";




const ProductFilter = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${publicRequest}/products?category=${cat}`
            : `${publicRequest}/products`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          item.category === cat
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  console.log(products.category)
  return (
    <div className='product-container1'>
      {cat
        ? filteredProducts.map((item) =>  <Product item={item} key={item._id} />)
        : products
            .slice(0, 12)
            .map((item) => <Product item={item} key={item._id} />)}
      {cat === "shop"
        ? products
            .map((item) => <Product item={item} key={item._id} />)
            : ""}
            
    </div>
  )
}

export default ProductFilter