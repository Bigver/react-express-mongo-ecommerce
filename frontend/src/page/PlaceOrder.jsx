import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import LoadingBox from '../component/LoadingBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div className='Preview'>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <div className="container-fluid">
        <br /><br />
        <ul className="list-unstyled multi-steps">
          <li>SHIPPING ADDRESS</li>
          <li>PAYMENT METHOD</li>
          <li className="is-active">PREVIEW ORDER</li>
          <li>FINISH</li>
        </ul>
      </div>
      <h1 className="my-3">PREVIEW ORDER</h1>
      <div className='place-ctn'>
        <div className='place-order'>
          <div className='order'>
            <div className="address">
              <div className='text'>
                <h1>
                  <strong>Name:</strong> {cart.shippingAddress.fullName}
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                  <Link to="/shipping" className='back'><FontAwesomeIcon icon={faPen} /></Link>
                </h1>
              </div>
            </div>
            <div className="payment">
              <div className='text'>
                <h1>
                  <strong>Payment</strong> {cart.paymentMethod}
                  <Link to="/payment"  className='back'><FontAwesomeIcon icon={faPen} /></Link>
                </h1>
              </div>
            </div>
            <div className="product">
              <div>
                <title>Items</title>
                <div variant="flush">
                  {cart.cartItems.map((item) => (
                    <div key={item._id}>
                      <div className="products">
                        <div md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                          ></img>{' '}
                        </div>
                        <div className='text'>
                          <h1>{item.name}</h1>
                          <p>จำนวนสินค้า{item.quantity} ชิ้น</p>
                          <p>ราคคาสินค้า ${item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='check-out-tt'>
            <div>
              <div>
                <title>Order Summary</title>
                <div className='check-out-ttt'>
                    <div className='text'>
                      <h1>Items ${cart.itemsPrice.toFixed(2)}</h1>
                    </div>
                  <div>
                      <h1>Tax ${cart.taxPrice.toFixed(2)}</h1>
                  </div>
                  <div>
                      <strong> Order Total</strong>
                      <strong> ${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                  <div>
                    <div className="d-grid">
                      <button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        className='btn'
                      >
                        Place Order
                      </button>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
}