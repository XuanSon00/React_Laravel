import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies  } from "react-cookie";
import toast from "react-hot-toast";

const UserContext = createContext();

const UserProvider = ({ children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [, setCookie, removeCookie] =useCookies('user');

//Đăng ký
const register = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/register', {
      email,
      password,
    });
    if (response.status === 201) {
      toast.success('Đăng ký thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setErrors(error.response.data.message || 'Đăng ký không thành công');
    } else {
      setErrors('Đăng ký không thành công');
    }
  }
}
//thông tin đăng nhập
const fetchUserInfo = async (token, setUser) => {
  try {
    const response = await axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      const userData = response.data;
      setUser(userData);
      console.log('Thông tin người dùng:', userData);
    }
  } catch (error) {
    console.error('Lỗi lấy thông tin người dùng:', error);
  }
};

//Đăng nhập
const csrf = async () => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { 
      withCredentials: true  
    });
  } catch (error) {
    console.error('Lỗi lấy CSRF token:', error); 
  }
};
 function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
} 
const login = async (email, password) => {
  setErrors('');
  try {
    await csrf();
    const response = await axios.post('http://localhost:8000/api/login', {
      email,
      password,
    }, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    });
    if (response.status === 200) {
      const { access_token, user } = response.data;
      sessionStorage.setItem('token', access_token); // lưu token vào sessionstorage
      setCookie('user', JSON.stringify(user), { path: '/' });
      setToken(access_token)
      fetchUserInfo(access_token);
      setUser(user);

      toast.success('Đăng nhập thành công!');
      setTimeout(() => {
        if (user.role === 'Admin') {
          navigate('/admin');
        } else if (user.role === 'Teacher') {
          navigate('/teacher');
        } else {
          navigate('/user');
        }
      }, 1000);
  }
  } catch (error) {
    if (error.response && error.response.data) {
      setErrors(error.response.data.message || 'Đăng nhập không thành công');
    } else {
      setErrors('Đăng nhập không thành công');
    }
  }
};
//Đăng xuất
const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      removeCookie('user', { path: '/' }); 
      sessionStorage.removeItem('token');
      setToken(null);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      sessionStorage.removeItem('token');
      removeCookie('user', { path: '/' });
      setToken(null);
      setUser(null);
      //navigate('/');
      window.location.reload();
    }
};
//Gửi Email đặt lại mật khẩu
const sendEmail = async () =>{
  try {
    const response = await axios.post('http://localhost:8000/api/password/email', { email });
    setMessage(response.data.message);
    setErrors({});
  } catch (error) {
    if (error.response && error.response.status === 422) {
      setErrors(error.response.data.errors);
    } else {
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  }
}
//Đặt lại mật khẩu
const resetPassword = async() =>{
  try {
    const response = await axios.post('http://localhost:8000/api/password/reset', {
      email,
      password,
      password_confirmation: passwordConfirmation,
      token,
    });
    setMessage(response.data.message);
    setErrors({});
    //window.location.href = `http://localhost:3000/api/password/reset?token=${token}&email=${email}`;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      setErrors(error.response.data.errors);
    } else {
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  } 
}

const value = {
  login,
  csrf,
  token,
  setToken,
  user,
  setUser,
  register,
  logout,
  email,
  setEmail,
  message,
  setMessage,
  errors,
  setErrors,
  sendEmail,
  setPasswordConfirmation,
  setPassword,
  resetPassword,
}

    return (
        <UserContext.Provider value={value}>
          {children}
        </UserContext.Provider>
      );

}
  
export { UserProvider, UserContext }