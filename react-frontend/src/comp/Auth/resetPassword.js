import React, { useContext, useEffect, useState } from 'react';
import './login.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { UserContext } from '../context/useContext';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
const {
    email, 
    setEmail, 
    errors,
    password,
    setPassword, 
    passwordConfirmation,
    setPasswordConfirmation,
    token,
    setToken,
    resetPassword,
    message, 
    setMessage} = useContext(UserContext);
    
const location = useLocation();

useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    const tokenParam = queryParams.get('token');
    if (emailParam && tokenParam) {
        setEmail(emailParam);
        setToken(tokenParam);
    }
}, [location.search, setEmail, setToken]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword();
    };

    return (
        <div className="containerLogin" id="login">
            <h3>Đặt Lại Mật Khẩu</h3>
            {message && <p className="success-message" style={{marginBottom:"15px", color:"red", textAlign:"center"}}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="login-input">
                    <EmailIcon style={{fontSize:'large' }}/>
                    <input type="email" placeholder="Email" value={email} readOnly />
                    <label htmlFor ="email">Email</label>
                </div>
                {errors.email && <span>{errors.email[0]}</span>}
                <div className="login-input">
                    <LockIcon style={{fontSize:'large' }}/>
                    <input type="password" name="password" placeholder="mật khẩu mới..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label htmlFor="password">Mật khẩu mới</label>
                </div>
                {errors.password && <span>{errors.password[0]}</span>}
                <div className="login-input">
                    <LockIcon style={{fontSize:'large' }}/>
                    <input type="password" placeholder=" nhập lại mật khẩu..." value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
                    <label htmlFor="password">Xác nhận mật khẩu mới</label>
                </div>
                <div className="login-input">
                    <input type="hidden" value={token} onChange={(e) => setToken(e.target.value)} />
                </div>
                <button type="submit" className="btn">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
