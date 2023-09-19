import React from 'react'
import { useLocation } from "react-router";
import { useState } from "react";
import ProductFilter from '../component/ProductFilter';

const Products = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    console.log(cat)
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
            });
        };
  return (
    <div className='products-ctn'>
        <div className='filter-ctn'>
            <div class="filter">
        {cat != "shop"
        ?
        <div class="select-job-items2">
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="newest">ราคา</option>
                <option value="asc">น้อยไปมาก</option>
                <option value="desc">มากไปน้อย</option>
            </select>
        </div>
        : <div></div>
        }
   
    </div>
        </div>
        <div className='product'>
            <ProductFilter  cat={cat} filters={filters} sort={sort}/>
        </div>
    </div>
  )
}

export default Products

// {
//     cat === "women-fashion" || cat === "clothes" 
//     ? 
//         <div class="select-job-items2" >
//             <select  name="size" onChange={handleFilters}>
//                 <option>Size</option>
//                 <option>S</option>
//                 <option>L</option>
//                 <option>XL</option>
//                 <option>XXL</option>
//             </select>
//         </div>
//     : <div></div>
// }