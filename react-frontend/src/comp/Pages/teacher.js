import React from 'react'
import Sidebar from '../Teacher/sidebar'
import Account from '../Teacher/account'
import Subject from '../Teacher/subject'
import List from '../Teacher/list'
import { Routes,Route } from "react-router-dom";
import './teacher.css'

const Teacher = () => {
    

  return (
    <>
    <div className='teacher'>
        <div className='teacher-page'>
            <Sidebar />
        </div>
        <div className='teacher-content'>
            <Routes>
                    <Route path="/" element={<Account />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/subject" element={<Subject />} />
                    <Route path="/list" element={<List />} />
            </Routes>
        </div>
    </div>
    </>
  )
}

export default Teacher
