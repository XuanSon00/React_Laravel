import React, { useContext, useEffect, useState } from 'react'
import './nav.css'
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link, } from 'react-router-dom';
import { UserContext } from '../context/useContext';
import { CartContext } from '../context/cartContext';
import { useCookies } from 'react-cookie';

const Nav = ({handleFilterChange }) => {
  const { totalSubject } = useContext(CartContext)
  const { logout } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [cookies] = useCookies(['email']);
  const userEmail = cookies.user?.email;
  const userRole = cookies.user?.role;

//Vai trò người dùng tương đương với đường dẫn thông tin cá nhân
let linkPath = '/user';
if (userRole === 'Admin') {
  linkPath = '/admin';
} else if (userRole === 'Teacher') {
  linkPath = '/teacher';
}


  return (
  <>
  <div className='header'>
    <div className='top_header'>
      <div className='info'>
        <div className='icon'>
          <SchoolIcon /> 
          <span>Giảm 10% học phí đăng ký khi đạt giá trị  <b>5.000.000</b><sup>đ</sup></span>
        </div>
        {
          userEmail ?
          <div className='userDropdown'>
            <div className='userImg' onClick={()=> setOpen(!open)}>
              <img src='/img/user-1.png' alt='avatar'/>
              <h3>{userEmail}</h3>
            </div>
            {
              open &&(
              <div className='userSetting'>
                <ul>
                  <li>
                    <div className='icon'>
                      <PersonIcon />
                    </div>
                    <div className='info'>
                      <Link to={linkPath}>Tài Khoản</Link>
                    </div>
                  </li>
                  <li>
                    <div className='icon'>
                      <ClassIcon />
                    </div>
                    <div className='cartHistory'>
                      <Link to='/class'>Khóa Học</Link>
                    </div>
                  </li>
                  <li>
                  <div className='icon'>
                    <LogoutIcon />
                  </div>
                  <div className='btn'>
                    <button onClick={logout}>Đăng xuất</button>
                  </div>
                  </li>
                </ul>
                </div>)
                }
          </div>
                :
              <div className='userActive'>
                <div className='icon'>
                    <LoginIcon />
                </div>
                <div className='btn'>
                  <Link to ='/login'><button>Đăng nhập</button></Link>
                </div>
                <b>||</b>
                <div className='btn'>
                  <Link to ='/login'><button>Đăng ký</button></Link>
                </div>
              </div>
            }
      </div>
    </div>
    <div className='mid_header'>
      <div className='logo'>
        <Link to='/'><img src='img/logo.jpg' alt=''/></Link>
      </div>
      <div className='searchBox'>
            <input type='text' onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
          </div>
      <div className='cartList'>
        <Link to='/cart' ><ShoppingBasketIcon style={{ fontSize: 40, color: '#27aae2' }}/></Link>
        <sup><span>{totalSubject}</span></sup>
      </div>
    </div>
  </div>
</>
  )
}

export default Nav
