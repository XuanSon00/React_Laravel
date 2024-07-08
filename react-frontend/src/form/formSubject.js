import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './formSubject.css'
const FormSubject = ({ onClose, onSubmit, selectedSubject }) => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectActive, setSubjectActive] = useState('');
    const [subjectGrade, setSubjectGrade] = useState('');
    const [subjectPrice, setSubjectPrice] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [subjectMaxStudents, setSubjectMaxStudents] = useState('');

    useEffect(() => {
      if (selectedSubject) {
        setSubjectName(selectedSubject.name);
        setSubjectActive(selectedSubject.active);
        setSubjectGrade(selectedSubject.grade);
        setSubjectPrice(selectedSubject.price);
        setImageBase64(selectedSubject.image);
        setSubjectMaxStudents(selectedSubject.max_students);
      }
    }, [selectedSubject]);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        name: subjectName,
        active: subjectActive,
        grade: subjectGrade,
        price: subjectPrice,
        image: imageBase64,
        max_students: subjectMaxStudents
      });
      onClose();
    };
  
    return (
      <div className='form_detail'>
        <div className='burForm' onClick={onClose}></div>
        <div className='container'>
          <button className='close_btn' onClick={onClose}><CloseIcon /></button>
          <h2>{selectedSubject ? 'Sửa' : 'Thêm'} Môn học</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input_name'>
              <label htmlFor='name' className='label'>Tên Môn Học: </label>
              <input type='text' name='name' className='input' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
            </div>
            <div className='input_img'>
              <label htmlFor='img' className='label'>Hình Ảnh</label>
              <input type='file' name='img' className='input' onChange={handleImageChange} />
            </div>
            <div className='input_active'>
              <label htmlFor='active' className='label'>Trạng Thái: </label>
              <select id="active" required value={subjectActive} onChange={(e) => setSubjectActive(e.target.value)} >
                <option value="">--</option>
                <option value="Mở" style={{ color: "red" }}>Đang mở</option>
                <option value="Đóng" style={{ color: "#d5bcbc" }}>Đang đóng</option>
              </select>
            </div>
            <div className='input_grade'>
              <label htmlFor='grade' className='label'>Lớp: </label>
              <select id="grade" required value={subjectGrade} onChange={(e) => setSubjectGrade(e.target.value)} >
                <option value="">--</option>
                <option value="Nâng Cao">Nâng Cao</option>
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
              </select>
            </div>
            <div className='input_price'>
              <label htmlFor='price' className='label'>Học phí: </label>
              <select id="price" required value={subjectPrice} onChange={(e) => setSubjectPrice(e.target.value)} >
                <option value="">--</option>
                <option value="500000">500.000<sup>đ</sup></option>
                <option value="1000000">1.000.000<sup>đ</sup></option>
                <option value="1500000">1.500.000<sup>đ</sup></option>
                <option value="2000000">2.000.000<sup>đ</sup></option>
                <option value="2500000">2.500.000<sup>đ</sup></option>
                <option value="3000000">3.000.000<sup>đ</sup></option>
              </select>
            </div>
            <div className='input_max'>
              <label htmlFor='maxStudents' className='label'>Số lượng Học viên: </label>
              <input type='number' name='maxStudents' className='input' value={subjectMaxStudents} onChange={(e) => setSubjectMaxStudents(e.target.value)} required />
            </div>
            <div className='btn_add'>
              <button className='confirmAdd' type='submit'>{selectedSubject ? 'Sửa' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default FormSubject
