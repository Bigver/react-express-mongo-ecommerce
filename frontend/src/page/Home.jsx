import ProductFilter from "../component/ProductFilter";
import HomeList from "../component/HomeList";






const Home = () => {
  return (
    <div className='home-container'>
      <HomeList/>
      <div className="products">
        <div className="new-product" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="new-pd"><span>NEW</span> PRODUCT</h1>
        </div>
          <ProductFilter />
      </div>   
    </div>
  )
}

export default Home