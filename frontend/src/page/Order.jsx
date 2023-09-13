import axios from 'axios';
import React, { useContext, useEffect, useReducer , useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}
export default function Order() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  console.log(params)
  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingUpdate, 
      loadingUpload,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  const [imgPayment, setImgPayment] = useState([]);
  const [isPaid, setisPaid] = useState("กำลังตรวจสอบ");
  const [isDelivered, setisDelivered] = useState("กำลังเตรียมพัสดุ");



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`https://react-nodejs-ecommerce.onrender.com/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setImgPayment(data.imgPayment);
        setisPaid(data.isPaid);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      console.log("err")
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    successPay,
    successDeliver,
  ]);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          imgPayment,
          isPaid,
          isDelivered
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/order-history');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('http://localhost:5000/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setImgPayment(data.secure_url);
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='order-'>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <div className="container-fluid">
        <br /><br />
        <ul className="list-unstyled multi-steps">
          <li>SHIPPING ADDRESS</li>
          <li>PAYMENT METHOD</li>
          <li>PREVIEW ORDER</li>
          <li className="is-active">FINISH</li>
        </ul>
      </div>
      <div className='order-layout'>
      <div className='order-container'>
        <h1 className="order-ctn">Order : <span>{orderId}</span></h1>
        <strong>Name: {order.shippingAddress.fullName} </strong>
        <strong>Address:  {order.shippingAddress.address} , {order.shippingAddress.city}
        , {order.shippingAddress.postalCode} 
        ,{order.shippingAddress.country}&nbsp;{order.shippingAddress.location &&
          order.shippingAddress.location.lat && (
            <a
              target="_new"
              href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}>
              Show On Map
            </a>
          )}
        </strong>,
          {order.orderItems.map((item) => (
            <div key={item._id}>
              <div className="align-items-center">
                <div className='product'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded img-thumbnail"
                  ></img>{' '}
                  <div className='text'>
                    <Link Link to={`/product/${item.slug}`} className='link'>{item.name}</Link>
                    <p>จำนวน {item.quantity} ชิ้น</p>
                    <p>ราคา ${item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <form onSubmit={submitHandler}>
            <div className="mb-3" controlId="image">
              <input
                value={imgPayment}
                onChange={(e) => setImgPayment(e.target.value)}
                required
                type='hidden'
              />
            </div>
            <div className='btn1' controlId="imageFile">
              <label>อัพโหลดสลิปโอนเงิน</label><br/>
              <div className='imgfile'>              
                <input type="file" onChange={uploadFileHandler}  />
                <img src={imgPayment} alt="" className='imgPayment'/>
              </div>
              {loadingUpload && <LoadingBox></LoadingBox>}
            </div>
            {userInfo && userInfo.isAdmin && (
              <div className='delivery'>
                <div className="mb-3" controlId="image">
                  <label htmlFor="">การจัดส่ง</label>
                  <input
                    value={isDelivered}
                    onChange={(e) => setisDelivered(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" controlId="image">
                  <label htmlFor="">สถานะชำระเงิน</label>
                  <input
                    value={isPaid}
                    onChange={(e) => setisPaid(e.target.value)}
                    required
                  />
                </div>
              </div>
                
            )}
            <div className="btn2">
              <button disabled={loadingUpdate} type="submit">
                ส่งสลิป
              </button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}
