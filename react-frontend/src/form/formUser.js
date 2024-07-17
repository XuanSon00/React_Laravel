import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './formAccount.css';
import { toast } from 'react-toastify';

const FormUser = ({ onClose, onSubmit, selectedAccount }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      setUserName(selectedAccount.name || '');
      setUserPassword(selectedAccount.password || '');
    }
  }, [selectedAccount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userPassword !== userConfirmPassword) {
      //alert('Mật khẩu không khớp');
      toast.error('Mật khẩu không khớp',{ autoClose: 500 });
      return;
    }
    onSubmit({
      name: userName,
      password: userPassword,
    });
    onClose();
  };

  return (
    <>
      <div className='form_detail_account'>
        <div className='burForm' onClick={onClose}></div>
        <div className='container'>
          <button className='close_btn' onClick={onClose}><CloseIcon /></button>
          <h2>{selectedAccount ? 'Sửa' : ''}Tài Khoản</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input_name'>
              <label htmlFor='name' className='label'>Tên: </label>
              <input type='text' name='name' className='input' value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className='input_name'>
              <label htmlFor='password' className='label'>Mật khẩu mới: </label>
              <input type='password' name='password' className='input' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
            </div>
            <div className='input_name'>
              <label htmlFor='confirmPassword' className='label'>Nhập lại mật khẩu: </label>
              <input type='password' name='confirmPassword' className='input' value={userConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className='btn_add'>
              <button className='confirmAdd' type='submit'>Sửa</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormUser;
