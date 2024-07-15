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
    const fetchData = async () => {
      try {
        const [
          userResponse,
          subjectResponse,
          studentResponse,
          teacherResponse,
          priceResponse,
        ] = await Promise.all([
          totalUser(),
          totalSubject(),
          totalStudent(),
          totalTeacher(),
          totalPriceX(),
        ]);

        setTotalUsers(userResponse.totalUsers);
        setLastUpdatedUsers(userResponse.lastUpdatedUser);

        setTotalSubjects(subjectResponse.totalSubjects);
        setLastUpdatedSubjects(subjectResponse.lastUpdatedSubject);

        setTotalStudents(studentResponse.totalStudents);
        setLastUpdatedStudents(studentResponse.lastUpdatedStudent);

        setTotalTeachers(teacherResponse.totalTeachers);
        setLastUpdatedTeachers(teacherResponse.lastUpdatedTeacher);

        setTotalPrices(priceResponse.total);
        setLastUpdatedBill(priceResponse.lastUpdatedPrice);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

  fetchData();
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
