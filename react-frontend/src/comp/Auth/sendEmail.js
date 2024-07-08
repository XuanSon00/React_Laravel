import React, { useContext, useState } from 'react'
import { UserContext } from '../context/useContext';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import './login.css'
const SendEmail = () => {
    const { email, setEmail, errors, message, sendEmail} = useContext(UserContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendEmail();
      };
    

  return (
    <>
    <div className="containerLogin" id="login">
        <h3 >Quên Mật Khẩu</h3>
        <form onSubmit={handleSubmit}>   
            <div className="login-input">
                <EmailIcon style={{fontSize:'large' }}/>
                <input type="email"  placeholder="nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor ="email">Email</label>
            </div>
            {errors.email && <span style={{color:'red'}}>{errors.email[0]}</span>}
            <button type="submit" className="btn">Gửi</button>
        </form>
        {message && <p style={{color:'red'}}>{message}</p>}
        <div className="links">
        <p>Đã có tài khoản</p>
        <Link to='/login'>Đăng nhập</Link>
        </div>
    </div>
    </>
  )
}

export default SendEmail
