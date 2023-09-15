import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../component/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faMinus , faPlus } from '@fortawesome/free-solid-svg-icons'
import { publicRequest } from "../requestMethod";



export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`${publicRequest}/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div>
        <h1 className='cart-'>SHOPPING CART</h1>
        <div>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <div className='cart-container'>
              {cartItems.map((item) => (
                <div key={item._id}>
                  <div className="cart">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                    </div>
                    <div className='btn-container'>
                      <Link to={`/product/${item.slug}`} className='text'><h1>{item.name}</h1></Link>
                      <div className='button'>
                        <button
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <div><h1>${item.price*item.quantity}</h1></div>
                        <div>
                          <button
                            onClick={() => removeItemHandler(item)}
                            variant="light"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='Checkout'>
                  <h3>
                    SUBTOTAL ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    ITEM) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                <button onClick={checkoutHandler} >Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}