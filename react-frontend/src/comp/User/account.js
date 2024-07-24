import React, { useContext, useEffect, useState } from 'react'
import { updateUserInfo, userInfo } from '../../api/account';
import FormUser from '../../form/formUser';
import SettingsIcon from '@mui/icons-material/Settings';
import './account.css'

const Account = () => {
  const [user, setUser] = useState({});
  const [editForm, setEditForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await userInfo();
      setUser(data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleEdit = (user) => {
    setSelectedAccount(user);
    setEditForm(true);
  };
  const handleFormClose = () => {
    setSelectedAccount(null);
    setEditForm(false);
  };

  const handleFormSubmit = async(updatedUser) =>{
    try{
      const data = await updateUserInfo(updatedUser);
      setUser(data);
      handleFormClose();
    }catch(error){
      console.error('lỗi cập nhật ' , error)
    }
  }

  return (
    <>
    {editForm && (
      <FormUser 
      onClose={handleFormClose} 
      onSubmit={handleFormSubmit} 
      selectedAccount={selectedAccount} />
    )} 
    <div className='user-account'>
      <div className='user-container'>
        <div className='user-title'>
          <h1>Thông tin cá nhân</h1>
          <SettingsIcon onClick={()=> handleEdit(user)}/>
        </div>
        <div className='input-account'>
          <div className='input-accountName'>
            <h3>Tên : </h3>
            <p>{user.name}</p>
          </div>
          <h3 className='id'>ID: 0{user.id}</h3>
        </div>
        <div className='input-account'>
          <h3>Email : </h3>
          <p>{user.email}</p>
        </div>
        <div className='input-account'>
          <h3>Trạng thái : </h3>
          <p style={{ color: user.status === 0 ? 'gray' : 'red' }}>{user.status === 1 ? "Đang hoạt động" : "Đang đóng"}</p>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Account
