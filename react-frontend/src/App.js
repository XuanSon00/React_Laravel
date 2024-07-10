import React, { useContext, useEffect } from "react";
import Home from "./comp/Home/home";
import Login from "./comp/Auth/login";
import Register from "./comp/Auth/register";
import Admin from "./comp/Pages/admin";
import Teacher from "./comp/Pages/teacher";
import User from "./comp/Pages/user";
import History from "./comp/Pages/history";
import { Route, Routes,Navigate  } from "react-router-dom";
import Cart from "./comp/Cart/cart";
import { CartContext } from "./comp/context/cartContext";
import SendEmail from "./comp/Auth/sendEmail";
import ResetPassword from "./comp/Auth/resetPassword";
import { useCookies } from 'react-cookie'
import PrivateRoute from "./private/privateRoute";
import Class from "./comp/Pages/class";
import SubjectDetail from "./comp/Pages/detail";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [cookies] = useCookies(['user']);
  const { setCart } =useContext(CartContext);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));//chuyển đổi chuỗi
      }
  }, []);

  const redirectRole = (role) =>{
    switch (role) {
      case 'Admin':
        return <Navigate to = '/admin' />
      case 'Teacher':
        return <Navigate to = '/teacher' />
      default:
        return <Home />
    }
  }


  
  return (
  <>
    <ToastContainer />
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={cookies.user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={cookies.user ? <Navigate to="/" /> : <Register />} />
      <Route path='/forgot-password' element={<SendEmail />} />
      <Route path="/reset-password/" element={<ResetPassword />} />
      {/**********************************************/}
      <Route path="/" element={ cookies.user ? redirectRole(cookies.user.role) : <Home /> } />
      <Route path="/admin/*" element={
        <PrivateRoute allowedRoles={['Admin']} redirectPath='/'>
          <Admin />
        </PrivateRoute>
      } />
      <Route path="/teacher/*" element={
        <PrivateRoute allowedRoles={['Teacher']} redirectPath='/'>
          <Teacher />
        </PrivateRoute>
      } />
      <Route path="/user/*" element={
        <PrivateRoute allowedRoles={['Student', '']} redirectPath='/'>
          <User />
        </PrivateRoute>
      } />
      <Route path="/class" element={
        <PrivateRoute allowedRoles={['Student']} redirectPath='/'>
          <Class />
        </PrivateRoute>
      } />
      {/**********************************************/}
      <Route path="/subjects/:id" element={<SubjectDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<h2>Không có trang cần tìm</h2>} />
    </Routes>
  </>
  );
}

export default App;