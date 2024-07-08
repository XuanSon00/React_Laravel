import React, { useContext, useEffect, useState } from 'react';
import Nav from '../Home/nav';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import './cart.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const {
    cart,
    setCart,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    totalPriceProduct,
    confirmPayment,
    calculateTotalPrice,
    discount,
    setDiscount,
    clearCart,
    shippingFee
  } = useContext(CartContext);
  
  const [showPayPal, setShowPayPal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    calculateTotalPrice();
    if (totalPriceProduct >= 5000000) {
      setDiscount(totalPriceProduct * 0.1);
    } else {
      setDiscount(0);
    }
  }, [cart, totalPriceProduct]);


  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Order from Cart",
          amount: {
            currency_code: "USD",
            value: (totalPriceProduct / 23000).toFixed(2),
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      confirmPayment(orderID)
      clearCart();
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An Error occurred with your payment");
  };

  useEffect(() => {
    if (success) {
      confirmPayment();
      alert("Payment successful!!");
      console.log('Order successful. Your order id is--', orderID);
    }
  }, [success]);

  return (
    <>
      <Nav />
      <PayPalScriptProvider options={{ "client-id": "AQl_qO0FIPzUQIk_0QYsAPx33mlhSIzyTcUgwjk6RMA3xELjcCA35_WJF0JJqKgVxPe3VzyypAQu6UCI" }}>
        <div className='cart'>
          <h3><ShoppingCartIcon /> Giỏ hàng</h3>
          <Link to='/history'><HistoryIcon /> Lịch sử mua hàng</Link>
          {cart.length === 0 && 
            <div className='empty_cart'>
              <h2>Giỏ hàng của bạn chưa có sản phẩm được thêm vào!!</h2>
              <Link to='/'><button>Đặt hàng ngay</button></Link>
            </div>
          }
          <div className='container'>
            {cart.map((subject) => {
              const price = parseFloat(subject.price.replace(/\./g, '').replace(',', '.')); // Chuyển đổi chuỗi sang số
              const quantity = subject.quantity;
              const totalPrice = price * quantity;
              const priceA = Math.floor(price).toLocaleString('vi-VN');
              const totalPriceString = Math.floor(totalPrice).toLocaleString('vi-VN'); // làm tròn số - phân cách số hàng nghin

              return (
                <div className='box' key={subject.id}>
                  <div className='img_box'>
                    <h4>{subject.name}</h4>
                  </div>
                  <div className='detail'>
                    <div className='info'>
                      <h4> {subject.grade}</h4>
                      <span>{priceA} <sup>đ</sup></span>
                      <p>Tổng cộng: <span>{totalPriceString}<sup>đ</sup></span> </p>
                    </div>
                    <div className='quantity'>
                      <button onClick={() => increaseQuantity(subject)}>+</button>
                      <input type='number' value={quantity} readOnly/>
                      <button onClick={() => decreaseQuantity(subject)}>-</button>
                    </div>
                    <div className='icon'>
                      <p onClick={() => removeProduct(subject)}><DeleteIcon /></p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='bottom'>
            {cart.length > 0 &&
              <>
                <div className='Total' >
                  <h4>Tổng cộng: </h4>
                  <p>{totalPriceProduct.toLocaleString('vi-VN')} <sup>đ</sup></p>
                </div>
                {discount > 0 && (
                  <div className='discount'>
                    <h4>Giảm giá: </h4>
                    <p>- {discount.toLocaleString('vi-VN')} <sup>đ</sup></p>
                  </div>
                )}
                <div className='shipping-fee'>
                  <h4>Phí vận chuyển: </h4>
                  <p>+ {shippingFee.toLocaleString('vi-VN')}<sup>đ</sup></p>
                </div>
                <div className='total-discount'>
                  <h4>Tổng cộng : </h4>
                  <p>{(totalPriceProduct - discount + shippingFee).toLocaleString('vi-VN')} <sup>đ</sup></p>
                </div>
                <button onClick={() => setShowPayPal(true)}>Thanh toán</button>
                {showPayPal && (
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                )}
              </>
            }
          </div>
        </div>
      </PayPalScriptProvider>
    </>
  );
}

export default Cart;
