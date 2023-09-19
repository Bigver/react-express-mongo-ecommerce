import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar.jsx";
import './styles/home.scss'
import Home from './page/Home.jsx';
import Product from './page/Product'
import Cart from './page/Cart.jsx';
import Register from './page/Register.jsx';
import Signin from './page/Signin.jsx';
import Shipping from './page/Shipping.jsx';
import Payment from './page/Payment.jsx';
import PlaceOrderScreen from './page/PlaceOrder.jsx';
import Order from './page/Order.jsx';
import OrderHistory from './page/OrderHistory.jsx';
import OrderList from './page/OrderList.jsx';
import ProductList from './page/ProductList.jsx';
import ProductEdit from './page/ProductEdit.jsx';
import Dashboard from './page/Dashboard.jsx';
import Footer from './component/Footer.jsx';
import Products from './page/Products.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './page/ForgetPassword.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <ToastContainer position="bottom-center" limit={1} />
      <header >
        <Navbar/>
      </header>
      <main>
        <div className="container-app">
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/admin/order-list" element={<OrderList/>} />
            <Route path="/admin/product-list" element={<ProductList/>} />
            <Route path="/admin/product/:id" element={<ProductEdit/>} />
            <Route path="/admin/dashboard" element={<Dashboard/>} />
          </Routes>
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
    </BrowserRouter>
  )
}

export default App
