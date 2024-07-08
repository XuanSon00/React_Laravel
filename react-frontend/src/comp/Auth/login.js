import React, { useState, useContext  } from 'react'
import './login.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/useContext';
import { Toaster } from 'react-hot-toast';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

//Google
/* const handleGoogleLogin = useGoogleLogin({
  onSuccess: async(response) =>{
    try {
      const res = await axios.get('http://www.googleapis.com/oauth2/v3/userinfo',
      {
        header: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }
      );
      console.log(res);
    } catch (error) {
      console.error('lỗi đăng nhập', error)
    }
  }
}) */
const responseGoogle = (response) => {
  // Gửi tokenId lên backend để xác thực và xử lý
  axios.post('/auth/google/callback', { tokenId: response.tokenId })
    .then(res => {
      window.location.href = '/'; // Chuyển hướng về trang chủ
    })
    .catch(err => {

    });
  }
  return (
  <>
  <div><Toaster position="top-center" reverseOrder={false} /></div>
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
      {errors && <p className="error-message" style={{color:"red"}}>{errors}</p>}
      <p className="recover">
        <Link to='/forgot-password'>Quên Mật Khẩu</Link>
      </p>
      <button type="submit" className="btn">Đăng nhập</button>
    </form>
    <p className="or">
      ----------or--------
    </p>
    {/* <GoogleLogin
      onSuccess={credentialResponse => {
        const decoded = jwtDecode(credentialResponse.credential)
        console.log(decoded);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />; */}
    {/* <GoogleLogin
      clientId='880798137528-7potkmjpooksskiv952kc4nqtegfe4gi.apps.googleusercontent.com'
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    /> */}
    <div className="links">
      <p>Không có mật khẩu?</p>
      <Link to='/register'>Đăng ký</Link>
    </div>
  </div>
    </>
  )
}

export default Login
