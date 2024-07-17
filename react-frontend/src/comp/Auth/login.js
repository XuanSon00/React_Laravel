import React, { useState, useContext  } from 'react'
import './login.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/useContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

 return (
  <>
  <div className="containerLogin" id="login">
    <h3 >Đăng nhập</h3>
    <form onSubmit={handleSubmit}>   
      <div className="login-input">
        <EmailIcon style={{fontSize:'large' }}/>
          <input type="email" name='email' placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor ="email">Email</label>
      </div>
      <div className="login-input">
        <LockIcon style={{fontSize:'large' }}/>
        <input type="password" name='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor ="password">Password</label>
      </div>
      {errors && <p className="error-message" style={{color:"red", marginBottom: "15px", textAlign: "center"}}>{errors}</p>}
      <p className="recover">
        <Link to='/forgot-password'>Quên Mật Khẩu</Link>
      </p>
      <button type="submit" className="btn">Đăng nhập</button>
    </form>
    <p className="or">
      ----------or--------
    </p>
    <div className="links">
      <p>Không có tài khoản ?</p>
      <Link to='/register'>Đăng ký</Link>
    </div>
  </div>
    </>
  )
}

export default Login
