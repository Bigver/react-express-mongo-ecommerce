import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function Payment() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'ชำระผ่านธนาคาร'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div className='payment-ctn'>
        <div className="container-fluid">
          <br /><br />
          <ul className="list-unstyled multi-steps">
            <li>SHIPPING ADDRESS</li>
            <li className="is-active">PAYMENT METHOD</li>
            <li>PREVIEW ORDER</li>
            <li>FINISH</li>
          </ul>
        </div>
      <div className="container-shipping">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">PAYMENT METHOD</h1>
        <form onSubmit={submitHandler} className='container-form'>
          <div className="mb-3">
            <input
              type="radio"
              id="Bank"
              label="Bank"
              value="Bank"
              checked={paymentMethodName === 'Bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <text>โอนชำระผ่านธนาคาร</text>
          </div>
          <div className="input-btn2">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}