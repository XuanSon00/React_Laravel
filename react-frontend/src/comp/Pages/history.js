import React, { useState, useEffect } from 'react';
import './history.css';

import { getOrderHistory } from '../../api/order';
import { userInfo } from '../../api/account';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const History = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await userInfo();
      setUser(data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  useEffect(() => { 
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const loadHistory = async () => {
        try {
          const response = await getOrderHistory();
          console.log('Dữ liệu nhận từ API:', response);
          setHistory(response);
        } catch (error) {
          console.error('Lỗi khi lấy lịch sử mua hàng:', error);
          setHistory([]);
        }
      };

      loadHistory();
    }
  }, [user]);

  return (
    <>
      <div className='list'>
        <h3><HistoryIcon /> Lịch sử mua hàng</h3>
        <button><Link to='/cart'><ShoppingCartIcon /> Giỏ hàng</Link></button>
        <div className='container'>
          {history.length > 0 ? (
            history.map((order, index) => (
              <div key={index} className='order'>
                <div className='order-details'>
                  <div className='order-info'>
                    <h3>{order.subject.name}</h3>
                    <p>Mã đơn: P-{order.id} </p>
                  </div>
                  <div className='order-items'>
                    <div className='order-item'>
                      <img src={order.subject.image} alt={order.subject.name} />
                      <div className='item-info'>
                        <div className='item-infoX'>
                          <i>Số lượng: {order.quantity}</i>
                          <p>Giá: {order.price.toLocaleString('vi-VN')} <sup>đ</sup></p>
                        </div>
                        <div className='item-infoX'>
                            <div className='infoX-price'>
                              <h3>Tổng:</h3>
                              <p>{(order.price * order.quantity).toLocaleString('vi-VN')}<sup>đ</sup></p>
                            </div>
                            <div className='infoX-time'>
                              <i>Thời gian mua:</i>
                              <i> {new Date(order.created_at).toLocaleString()}</i>
                            </div>

                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có lịch sử mua hàng.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default History;
