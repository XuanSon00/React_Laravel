import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { TotalUser, TotalSubject, TotalTeacher, TotalStudent, TotalPrice } from './adminData'
import { totalUser, totalStudent, totalTeacher,  } from '../../api/account'
import { totalSubject } from '../../api/subject'
import { totalPriceX } from '../../api/order'
const Dashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalPrices, setTotalPrices] = useState(0);
  const [lastUpdatedUsers, setLastUpdatedUsers] = useState('');
  const [lastUpdatedSubjects, setLastUpdatedSubjects] = useState('');
  const [lastUpdatedStudents, setLastUpdatedStudents] = useState('');
  const [lastUpdatedTeachers, setLastUpdatedTeachers] = useState('');
  const [lastUpdatedBill, setLastUpdatedBill] = useState('');

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const data = await totalUser();
        setTotalUsers(data.totalUsers);
        setLastUpdatedUsers(data.lastUpdatedUser);
      } catch (error) {
        console.error('lỗi lấy tổng người dùng:', error);
      }
    };
    const fetchTotalSubjects = async () => {
      try {
        const data = await totalSubject();
        setTotalSubjects(data.totalSubjects);
        setLastUpdatedSubjects(data.lastUpdatedSubject);
      } catch (error) {
          console.error('lỗi lấy tổng môn học:', error);
      }
    };
    const fetchTotalStudents = async () => {
      try {
        const data = await totalStudent();
        setTotalStudents(data.totalStudents);
        setLastUpdatedStudents(data.lastUpdatedStudent);
      } catch (error) {
          console.error('lỗi lấy tổng học sinh:', error);
      }
    };
    const fetchTotalTeachers = async () => {
      try {
          const data = await totalTeacher();
          setTotalTeachers(data.totalTeachers);
          setLastUpdatedTeachers(data.lastUpdatedTeacher);
      } catch (error) {
          console.error('Lỗi lấy tổng giáo viên:', error);
      }
    };

    const fetchTotalPrices = async () => {
      try {
          const data = await totalPriceX();
          setTotalPrices(data.total);
          setLastUpdatedBill(data.lastUpdatedPrice);
      } catch (error) {
          console.error('lỗi lấy dữ liệu tổng hóa đơn:', error);
      }
  };
  
  fetchTotalUsers();
  fetchTotalSubjects();
  fetchTotalStudents();
  fetchTotalTeachers();
  fetchTotalPrices();
}, []);


  return (
    <>
      <div className='dashboard'>
        <div className='admin'>
          <div className='admin-up'>
            <div className='admin-up-left'>
              <TotalUser totalUsers={totalUsers} lastUpdated={lastUpdatedUsers} />
              <TotalSubject totalSubjects={totalSubjects} lastUpdated={lastUpdatedSubjects} />
              <TotalStudent totalStudents={totalStudents} lastUpdated={lastUpdatedStudents} />
              <TotalTeacher totalTeachers={totalTeachers} lastUpdated={lastUpdatedTeachers} />
              <TotalPrice totalPrices={totalPrices} lastUpdated={lastUpdatedBill} />            </div>
            
          </div>
        </div>
      </div>
    </>
  )
  
}

export default Dashboard
