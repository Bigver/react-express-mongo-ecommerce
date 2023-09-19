import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { publicRequest } from "../requestMethod";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faClipboard} from '@fortawesome/free-solid-svg-icons'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function Dashboard() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${publicRequest}/orders/summary`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className='dashboard-ctn'>
      <h1>DASHBOARD</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className='dashboard'>
          <div className='box-container'>
            <div className='box'>
              <div className='box-user'>
                <div>
                  <h3><FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} /> {summary.users[0].numUsers} USERS </h3>
                </div>
              </div>
            </div>
            <div className='box'>
              <div className='box-oder'>
                <div>
                  <h3>  <FontAwesomeIcon icon={faClipboard} style={{color: "#ffffff",}} />  {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0} Orders</h3>
                </div>
              </div>
            </div>
            <div className='box'>
              <div className='box-price'>
                <div>
                  <h3>                
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0} &#3647;</h3> 
                </div>
              </div>
            </div>
          </div>
          <div className="sale">
            <h1>SALES</h1>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="categories">
            <h1>CATAGORIES</h1>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </div>
      )}
    </div>
  );
}