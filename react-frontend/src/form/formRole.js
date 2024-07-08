import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './formRole.css'
const FormRole = ({onClose, onSubmit, selectedRole }) => {
/*-------------------Form thông tin loại tài khoản-----------------*/
const [roleName, setRoleName] = useState('');
const [roleStatus, setRoleStatus] = useState('');
useEffect(() => {
    if(selectedRole) {
        setRoleName(selectedRole.name);
        setRoleStatus(selectedRole.status)
    }
  }, [selectedRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: roleName,
      status: roleStatus,
    });
    onClose();
  };
    
  return (
    <>
    <div className='form_detail_role'>
      <div className='burForm' onClick={onClose}></div>
        <div className='container'>
          <button className='close_btn' onClick={onClose}><CloseIcon /></button>
          <h2>{selectedRole ? 'Sửa' : 'Thêm'} Loại Tài Khoản</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input_name'>
              <label htmlFor='name' className='label'>Loại tài khoản: </label>
              <input type='text' name='name' className='input' value={roleName} onChange={(e) => setRoleName(e.target.value)} required />
            </div>
            <div className='input_active'>
              <label htmlFor='active' className='label'>Trạng Thái: </label>
              <select id="active" required value={roleStatus} onChange={(e) => setRoleStatus(e.target.value)} >
                <option value="">--</option>
                <option value="0" style={{color:"#d5bcbc"}}>Đang đóng</option>
                <option value="1" style={{color:"red"}}>Đang hoạt động</option>
              </select>
            </div>
            <div className='btn_add'>
              <button className='confirmAdd' type='submit'>{selectedRole ? 'Sửa' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormRole
