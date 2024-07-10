import React, { useEffect, useState } from 'react'
import Nav from '../Home/nav'
import InfoIcon from '@mui/icons-material/Info';
import './class.css'
import { createEnroll, getEnroll, getUserEnrollments,  } from '../../api/enroll';
import { getSchedule } from '../../api/schedule';
import { userInfo } from '../../api/account';
import toast, { Toaster } from 'react-hot-toast';

const Class = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredGrade, setFilteredGrade] = useState([]);
  const [user, setUsers] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState([]); 

  const loadSchedule = async () => {
    try {
      const response = await getSchedule();
      //console.log('Dữ liệu nhận từ API:', response.data);
      setSchedules(response.data);
      setFilteredGrade(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setSchedules([]);
    }
  };
  const loadUser = async () => {
    try {
      const response = await userInfo(); 
      setUsers(response); 
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  const loadEnrollment = async () => {
    try {
      const response = await getEnroll(user.id); 
      setEnrollments(response.data); 
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  useEffect(() => {
    loadSchedule();
    loadUser();
  }, []);
  useEffect(() => {
    loadEnrollment();
  }, [user]); 

  const filterGrade = (selectedGrade) => {
    if (selectedGrade === "") {
      setFilteredGrade(schedules);
    } else {
      const filtered = schedules.filter(schedule => schedule.grade === selectedGrade);
      setFilteredGrade(filtered);
    }
  };
  const handleEnroll = async (idSchedule, idSubject) =>{
    try{
      const enrollData = {
        idSubject: idSubject,
        idUser: user.id,
        idSchedule: idSchedule,
      };
      const response = await createEnroll(enrollData);
      //console.log('Đăng ký lớp học thành công', response.data);
      toast.success('Đăng ký lớp học thành công!');
      loadSchedule();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Bạn đã đăng ký lớp học này!');
        } else if (error.response.status === 403) {
          toast.error('Bạn chưa mua khóa học này!');
        } else {
          console.error('Lỗi khi đăng ký lớp học', error);
        }
      }
    }
  }
  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredGrade(schedules.filter(schedule =>
      schedule.subject.name && schedule.subject.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  
  
const isEnrolled = (idSchedule) => {
    return enrollments.some(enrollment => enrollment.idSchedule === idSchedule);
  };


  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      <Nav handleFilterChange={handleFilterChange}/>
      <div className='class'>
        <div className='top_banner'></div>
        <div className='trending'>
          <div className='container'>
            <div className='left_box'>
              <div className='header'>
                <div className='heading'>
                  <h2 onClick={() => loadSchedule()}> Tất cả Môn học</h2>
                </div>
                <div className='cate'>
                  <h3 onClick={() => filterGrade('10')}>Lớp 10</h3><p>||</p>
                  <h3 onClick={() => filterGrade('11')}>Lớp 11</h3><p>||</p>
                  <h3 onClick={() => filterGrade('12')}>Lớp 12</h3><p>||</p>
                  <h3 onClick={() => filterGrade('Nâng Cao')}>Nâng Cao</h3>
                </div>
              </div>
              <div className='subject'>
                <div className='container'>
                  {filteredGrade.map((schedule) => {
                    return (
                      <div className='box' key={schedule.id}>
                        <div className='img_box'>
                          <img src={schedule.subject.image} alt='' style={{ height: 180 }} />
                          <div className='icon'>
                            <div className='icon_box'>
                              <InfoIcon />
                            </div>
                          </div>
                        </div>
                        <div className='info'>
                          <div className='info-subject'>
                            <h3>{schedule.subject.name}</h3>
                            <span>{schedule.grade}</span>
                          </div>
                          <div className='info-teacher'>
                            <span>Giảng viên:</span>
                            <p>{schedule.teacher.name}</p>
                          </div>
                          <div className='info-price'>
                            <span>Số lượng:</span>
                            <p>0/10</p>
                          </div>
                          <div className='addTocart'>
                            {isEnrolled(schedule.id) ? (
                              <button className='btn-disable' disabled>Đã Đăng ký</button>
                            ) : (
                              <button className='btn' onClick={() => handleEnroll(schedule.id, schedule.subject.id)}>
                                Đăng ký lớp
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Class
