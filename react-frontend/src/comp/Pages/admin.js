import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from '../Admin/sidebar';
import Dashboard from '../Admin/dashboard';
import AccountType from '../Admin/accountType';
import Account from '../Admin/account';
import Subject from '../Admin/subject';
import Date from '../Admin/date';
import List from '../Admin/list';
import './admin.css';
import EducationType from '../Admin/educationType';
import Lesson from '../Admin/lesson';
import Bill from '../Admin/bill';

const Admin = () => {
  return (
    <div className='admin'>
      <div className='admin-page'>
        <Sidebar />
      </div>
      <div className='admin-content'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AccountType" element={<AccountType />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/educationType" element={<EducationType />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/date" element={<Date />} />
          <Route path="/list" element={<List />} />
          <Route path="/bill" element={<Bill />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
