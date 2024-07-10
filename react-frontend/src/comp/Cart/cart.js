import React, { useContext, useEffect, useState } from 'react';
import Nav from '../Home/nav';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import './cart.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
      //alert("Payment successful!!");
      toast.success('Thanh toán thành công',{ autoClose: 2000 });
      console.log('Order successful. Your order id is--', orderID);
    }
  }, [success]);

  return (
    <>
      <Nav />
      <PayPalScriptProvider options={{ "client-id": "AQl_qO0FIPzUQIk_0QYsAPx33mlhSIzyTcUgwjk6RMA3xELjcCA35_WJF0JJqKgVxPe3VzyypAQu6UCI" }}>
        <div className='cart'>
          <h3 className='cart-title'><ShoppingCartIcon /> Giỏ hàng</h3>
          {
            cart.length === 0 && 
            <div className='empty_cart'>
              <h2>Giỏ hàng của bạn chưa có sản phẩm được thêm vào!!</h2>
              <Link to='/'><button>Đặt hàng ngay</button></Link>
            </div>
          }
          <div className='container'>
            <div className='title'>
              <h3 className='subject-title'>Khóa học</h3>
              <h3 className='price-title'>Học phí</h3>
              <h3 className='quantity-title'>Số lượng</h3>
              <h3 className='totalPrice-title'>Tổng</h3>
            </div>
            {cart.map((subject) => {
              const price = parseFloat(subject.price.replace(/\./g, '').replace(',', '.')); // Chuyển đổi chuỗi sang số
              const quantity = subject.quantity;
              const totalPrice = price * quantity;
              const priceA = Math.floor(price).toLocaleString('vi-VN');
              const totalPriceString = Math.floor(totalPrice).toLocaleString('vi-VN'); // làm tròn số - phân cách số hàng nghin

              return (
                <div className='box' key={subject.id}>
                  <div className='img_box'>
                    <img src={subject.image} />
                    <div className=''>
                      <h3>{subject.name}</h3>
                      <h3>{subject.grade}</h3>
                      <button onClick={() => removeProduct(subject)}><DeleteIcon /></button>
                    </div>
                  </div>
                  <div className=''>
                    <span>{priceA} <sup>đ</sup></span>
                  </div>
                  <div className='quantity-box'>
                    <button onClick={() => increaseQuantity(subject)}><AddIcon /></button>
                    <div className='count'>
                      <p>{quantity}</p>
                    </div>
                    <button onClick={() => decreaseQuantity(subject)}><RemoveIcon /></button>
                  </div>
                  <div className='total-box'>
                    <span>{totalPriceString}<sup>đ</sup></span>
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
                  <b>{totalPriceProduct.toLocaleString('vi-VN')} <sup>đ</sup></b>
                </div>
                {discount > 0 && (
                  <div className='discount'>
                    <h4>Giảm giá: </h4>
                    <i>- {discount.toLocaleString('vi-VN')} <sup>đ</sup></i>
                  </div>
                )}
                <div className='shipping-fee'>
                  <h4>Phí vận chuyển: </h4>
                  <i>+ {shippingFee.toLocaleString('vi-VN')}<sup>đ</sup></i>
                </div>
                <div className='total-discount'>
                  <h4>Tổng Thanh toán : </h4>
                  <p>{(totalPriceProduct - discount + shippingFee).toLocaleString('vi-VN')} <sup>đ</sup></p>
                </div>
                <div className='pay'>
                  <button onClick={() => setShowPayPal(true)}>Thanh toán</button>
                  {showPayPal && (
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </div>
                
              </>
            }
          </div>
        </div>
      </PayPalScriptProvider>
    </>
  );
}

export default Cart;
