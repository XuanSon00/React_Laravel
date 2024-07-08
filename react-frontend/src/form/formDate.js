import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './formDate.css';
import { getSubjects, getTeachers, createDate, updateDate } from '../api/schedule';
import { addDays, format } from 'date-fns'; 

const FormDate = ({ onClose, setLoading, selectedDate, fetchSchedules }) => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    idSubject: '',
    grade: '',
    startTime: '',
    endTime: '',
    idTeacher: '',
    schedule:'',
    available_seats:'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData.data);
        const teachersData = await getTeachers();
        setTeachers(teachersData.data);
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
      }
    };

    fetchData();

    if (selectedDate) {
      setFormData({
        idSubject: selectedDate.idSubject.toString(),
        grade: selectedDate.grade,
        startTime: selectedDate.startTime,
        endTime: selectedDate.endTime,
        idTeacher: selectedDate.idTeacher.toString(),
        schedule: selectedDate.schedule,
        available_seats: selectedDate.available_seats,
      });
    }
  }, [selectedDate]);

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'startTime') {
      const startDate = new Date(value);
      const daysToAdd = Math.ceil(50 / 3) * 7; //số ngày cần thêm để đạt 50 buổi học (mỗi tuần học 3 buổi)
      const endDate = addDays(startDate, daysToAdd);
      const newEndTime = format(endDate, 'dd-MM-yyyy');
      setFormData({ ...formData, [name]: value, endTime: newEndTime });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (selectedDate) {
        await updateDate(selectedDate.id, formData);
      } else {
        await createDate(formData);
      }
      fetchSchedules();
      onClose();
    } catch (error) {
      console.error('Lỗi thêm / cập nhật dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  let uniqueSubjects = subjects.filter((subject, index, self) =>
    index === self.findIndex((s) => (
      s.name === subject.name
    ))
  );

  return (
    <div className='form_detail_date'>
      <div className='burForm' onClick={onClose}></div>
      <div className='container'>
        <button className='close_btn' onClick={onClose}><CloseIcon /></button>
        <h2>{selectedDate ? 'Sửa' : 'Thêm'} Lịch Giảng Dạy</h2>
        <form className='form' onSubmit={handleSubmit}>
          <div className='input_subject'>
            <label htmlFor='subject' className='label'>Môn Học: </label>
            <select id="idSubject" name="idSubject" value={formData.idSubject} required onChange={handleSelectChange}>
              <option value="">-- Chọn môn học --</option>
              {uniqueSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div className='input_grade'>
            <label htmlFor='grade' className='label'>Lớp: </label>
            <select id="grade" name="grade" required value={formData.grade} onChange={handleChange}>
              <option value="">-- Chọn lớp --</option>
              <option value="Nâng Cao">Nâng Cao</option>
              <option value="10">Lớp 10</option>
              <option value="11">Lớp 11</option>
              <option value="12">Lớp 12</option>
            </select>
          </div>
          <div className='input_date'>
            <label htmlFor='startTime' className='label'>Thời gian bắt đầu: </label>
            <input type="text" name="startTime" className='input' value={formData.startTime} placeholder="Thời gian bắt đầu" onChange={handleChange} required />
          </div>
          <div className='input_date'>
            <label htmlFor='endTime' className='label'>Thời gian kết thúc: </label>
            <input type="text" name="endTime" className='input' value={formData.endTime} placeholder="Thời gian kết thúc" onChange={handleChange} required readOnly/>
          </div>
          <div className='input_grade'>
            <label htmlFor='schedule' className='label'>Lịch học: </label>
            <select id="schedule" name="schedule" required value={formData.schedule} onChange={handleChange}>
              <option value="">-- Chọn lịch --</option>
              <option value="2-4-6">Thứ 2-4-6: 8g30 - 11g30</option>
              <option value="3-5-7">Thứ 3-5-7: 18g30 - 21g30</option>
            </select>
          </div>
          <div className='input_date'>
            <label htmlFor='number' className='label'>Số buổi: </label>
            <h3>50</h3>
          </div>
          <div className='input_active'>
            <label htmlFor='teacher' className='label'>Giảng viên: </label>
            <select id="idTeacher" name="idTeacher" required value={formData.idTeacher} onChange={handleSelectChange}>
              <option value="">-- Chọn giảng viên --</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
              ))}
            </select>
          </div>
          <div className='btn_add'>
            <button className='confirmAdd' type='submit'>{selectedDate ? 'Lưu' : 'Thêm'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDate;
