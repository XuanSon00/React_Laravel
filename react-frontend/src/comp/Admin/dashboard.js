import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { TotalUser, TotalSubject, TotalTeacher, TotalStudent, TotalPrice } from './adminData'
import { getDashboardData } from '../../api/dashboard'
const Dashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [lastUpdatedUsers, setLastUpdatedUsers] = useState('');
  const [lastUpdatedSubjects, setLastUpdatedSubjects] = useState('');
  const [lastUpdatedStudents, setLastUpdatedStudents] = useState('');
  const [lastUpdatedTeachers, setLastUpdatedTeachers] = useState('');
  const [lastUpdatedBill, setLastUpdatedBill] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        console.log(response.total)

        setTotalUsers(response.totalUsers);
        setLastUpdatedUsers(response.lastUpdatedUser);

        setTotalSubjects(response.totalSubjects);
        setLastUpdatedSubjects(response.lastUpdatedSubject);

        setTotalStudents(response.totalStudents);
        setLastUpdatedStudents(response.lastUpdatedStudent);

        setTotalTeachers(response.totalTeachers);
        setLastUpdatedTeachers(response.lastUpdatedTeacher);

        setTotalPrice(response.totalPrice);
        setLastUpdatedBill(response.lastUpdatedPrice);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

  fetchData();
}, []);

console.log(totalPrice);
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
              <TotalPrice totalPrice={totalPrice} lastUpdated={lastUpdatedBill} />            </div>
            
          </div>
        </div>
      </div>
    </>
  )
  
}

export default Dashboard
