import React, { useContext, useState } from 'react'
import './register.css'
import { Link,  } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { UserContext } from '../context/useContext';
import { Toaster } from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, errors, setErrors } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors('Mật khẩu không khớp');
      return;
    }
    register(email, password);
  }
  return (
  <>
  <div><Toaster position="top-center" reverseOrder={false} /></div>
  <div className="containerRegister" id="register">
    <h3>Đăng ký</h3>
    <form onSubmit={handleSubmit}>
      <div className="register-input">
        <EmailIcon style={{fontSize:'large' }}/>
        <input type='email' name='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <label htmlFor="Email">Email</label>
      </div>
      <div className="register-input">
        <LockIcon style={{fontSize:'large' }}/>
        <input type='password' name='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <label htmlFor="Password">Password</label>
      </div>
      <div className="register-input">
        <LockIcon style={{fontSize:'large' }}/>
        <input type='password' name='confirmPassword' className='form-control' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <label htmlFor="ConfirmPassword">Confirm Password</label>
      </div>
      <div className="messageDiv" style={{display: 'flex'}}>
        {errors && <div className="error" style={{color:'red'}}>{errors}</div>}
      </div>
      <button className="btn" type="submit">Đăng ký</button>
      </form>
      <p className="or">
        ----------or--------
      </p>
      <div className="icons">
      </div>
      <div className="links">
        <p>Đã có tài khoản</p>
        <Link to='/login'>Đăng nhập</Link>
      </div>
    </div>
    </>
  )
}

export default Register
