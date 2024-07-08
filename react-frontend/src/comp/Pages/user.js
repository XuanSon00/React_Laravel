import { React, useContext } from 'react'
import Sidebar from '../User/sidebar';
import { Route, Routes } from 'react-router-dom';
import Account from '../User/account';
import Recipt from '../User/recipt';
import Subject from '../User/subject';
import './user.css'
const User = () => {
  return (

    <>
    <div className='user'>
        <div className='user-page'>
            <Sidebar />
        </div>
        <div className='user-content'>
            <Routes>
                    <Route path="/" element={<Account />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/recipt" element={<Recipt />} />
                    <Route path="/subject" element={<Subject />} />
            </Routes>
        </div>
    </div>
    </>
  )
}

export default User
