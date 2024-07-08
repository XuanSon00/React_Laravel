import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './formAccount.css'

const FormAccount = ({onClose, onSubmit, selectedAccount}) => {
    const [accountName, setAccountName] = useState('');
    const [accountStatus, setAccountStatus] = useState('');
    const [accountRole, setAccountRole] = useState('');

   useEffect(() => {
    if (selectedAccount) {
      setAccountName(selectedAccount.name);
      setAccountStatus(selectedAccount.status);
      setAccountRole(selectedAccount.role);
    }
  }, [selectedAccount]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: accountName,
      status: accountStatus,
      role: accountRole,
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
              <label htmlFor='name' className='label'>Tài khoản: </label>
              <input type='text' name='name' className='input' value={accountName} onChange={(e) => setAccountName(e.target.value)} required />
            </div>
            <div className='input_active'>
              <label htmlFor='status' className='label'>Trạng Thái: </label>
              <select id="active" required value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} >
                <option value="">--</option>
                <option value="1" style={{color:"red"}}>Đang hoạt động</option>
                <option value="0" style={{color:"#d5bcbc"}}>Đang đóng</option>
              </select>
            </div>
            <div className='input_role'>
              <label htmlFor='role' className='label'>Vai trò</label>
              <select id="role" required value={accountRole} onChange={(e) => setAccountRole(e.target.value)} >
                <option value="">--</option>
                <option value="Admin" style={{color:"red"}}>Admin</option>
                <option value="Teacher" style={{color:"blue"}}>Teacher</option>
                <option value="Student" style={{color:"orange"}}>Student</option>
              </select>
            </div>
            <div className='btn_add'>
              <button className='confirmAdd' type='submit'>Sửa</button>
            </div>
          </form>
        </div>
    </div>
    </>
  )
}

export default FormAccount
