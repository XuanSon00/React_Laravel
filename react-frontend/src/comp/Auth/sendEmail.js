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
            {errors && <div className="error" style={{color:'red'}}>{errors}</div>}
            <button type="submit" className="btn">Gửi</button>
        </form>
        {message && <p style={{color:'red', marginTop: "15px", textAlign:"center"}}>{message}</p>}

    </div>
    </>
  )
}

export default SendEmail
