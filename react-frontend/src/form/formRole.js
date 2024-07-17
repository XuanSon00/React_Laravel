import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './formRole.css'
const FormRole = ({onClose, onSubmit, selectedRole }) => {
/*-------------------Form thông tin loại tài khoản-----------------*/
const [roleName, setRoleName] = useState('');
const [roleStatus, setRoleStatus] = useState('');
const [error, setError] = useState('');

useEffect(() => {
  if(selectedRole) {
    setRoleName(selectedRole.name);
    setRoleStatus(selectedRole.status)
  }
}, [selectedRole]);

const validateForm = () => {
  if (!roleName.trim()) {
    return "Vui lòng không để trống!";
  }
  return "";
};


const handleSubmit = (e) => {
  e.preventDefault();
  const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  try {
    onSubmit({
      name: roleName,
      status: roleStatus,
    });
    onClose();
  
  } catch (error){
    setError('Có lỗi xảy ra vui lòng thử lại sau')
  }
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
        {error && <div className='error_message' style={{color:'red', marginTop: '20px', textAlign: "center"}}>{error}</div>}
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
