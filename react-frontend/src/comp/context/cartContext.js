import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { userInfo } from "../../api/account";
import { toast } from 'react-toastify';

const CartContext = createContext();
const CartProvider = ({ children }) =>{
    const [cart, setCart] = useState([]);
    const [totalSubject, setTotalSubject] = useState(0);
    const [discount, setDiscount] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
      const totalItems = new Set(cart.map(item => item.id)); //set: tập hợp các id từng mảng->size:lấy số phần tử
      setTotalSubject(totalItems.size);
    }, [cart]);
  

//duy trì trạng thái giỏ hàng khi refesh trang
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));//chuyển đổi chuỗi
      }
    }, []); 

    const addToCart = (product) => {
      const exist = cart.findIndex((x) => x.id === product.id);
      if (exist !== -1) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
          const updatedCart = [...cart];
          updatedCart[exist].quantity += 1;
          setCart(updatedCart);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          //alert('Đã thêm sản phẩm vào giỏ')
          toast.success('Đã thêm sản phẩm vào giỏ hàng',{ autoClose: 2000 });

      } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
          const newCart = [...cart, { ...product, quantity: 1 }];
          setCart(newCart);
          localStorage.setItem('cart', JSON.stringify(newCart));
          //alert('Đã thêm sản phẩm vào giỏ hàng')
          toast.success('Đã thêm sản phẩm vào giỏ hàng',{ autoClose: 2000 });

      }
    }
//tăng số lượng
const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};
//giảm số lượng
const decreaseQuantity = (product) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          //alert("Số lượng tối thiểu là 1");
          toast.warning('Số lượng tối thiểu là 1',{ autoClose: 2000 });
        }
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};
//xóa sản phẩm
const removeProduct = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
//Tổng giá sản phẩm 
const [totalPriceProduct, setTotalPriceProduct] = useState(0);
const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((product) => {
      const price = parseFloat(product.price.replace(/\./g, '').replace(',', '.')); //  đổi chuỗi sang số
      totalPrice += price * product.quantity;
    });
    setTotalPriceProduct(totalPrice);
  };

//xóa giỏ hàng khi thanh toán thành công
const clearCart = () => {
    setCart([]); 
    localStorage.removeItem('cart'); 
  }
//thông tin người dùng đang đăng nhập
useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await userInfo();
      setUser(data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  fetchUser();
}, []);
//xác nhận thanh toán
const shippingFee = totalPriceProduct < 5000000 ? 100000 : 0;
const confirmPayment = async (orderID) => {
  console.log(user.id)
  if (cart.length === 0) {
      //alert('Giỏ hàng đang trống');
      toast.warning('Giỏ hàng đang trống',{ autoClose: 2000 });
      return;
  }
  try {
    const response = await axios.post('http://localhost:8000/api/orders', {
      idUser: user.id, 
      items: cart.map(item => ({
        idSubject: item.id,
        price: parseFloat(item.price.replace(/\./g, '').replace(',', '.')), 
        quantity: item.quantity,
      })),
      payment_method: 'PayPal',
      payment_status: 'Completed',
      //orderID: orderID, 
    });
    
  } catch (error) {
    console.error('Lỗi khi thanh toán:', error);
    //alert('Có lỗi khi thanh toán. Vui lòng thử lại sau.');
    toast.warning('Có lỗi khi thanh toán. Vui lòng thử lại sau',{ autoClose: 2000 });
  }
  clearCart();
};





const value = {
    cart, 
    setCart, 
    addToCart, 
    totalSubject,
    increaseQuantity, 
    decreaseQuantity, 
    removeProduct,
    totalPriceProduct,
    setTotalPriceProduct,
    calculateTotalPrice,
    clearCart,
    discount,
    setDiscount,
    confirmPayment,
    shippingFee
}

    return (
        <CartContext.Provider value={value}>
          {children}
        </CartContext.Provider>
      );
}

export { CartContext, CartProvider }