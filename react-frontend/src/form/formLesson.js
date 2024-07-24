import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './formSubject.css'
import { getSubject } from '../api/subject';

const FormLesson = ({ onClose, onSubmit, selectedLesson }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSubject = async () => {
      try {
        const response = await getSubject();
        setSubjects(response);
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
        setSubjects([]);
      }
    };

    loadSubject();

    if (selectedLesson) {
        setSelectedSubject(selectedLesson.idSubject);
        setTitle(selectedLesson.title);
        setVideo(null);
        setContent(selectedLesson.content);
    }
}, [selectedLesson]);

const validateForm = () => {
  if (!title.trim() || !content.trim() || !video) {
    return "Vui lòng không để trống!";
  }
  return "";
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationError = validateForm();
  if (validationError) {
      setError(validationError);
      return;
  }
  try {
      const formData = new FormData();
      formData.append('idSubject', selectedSubject);
      formData.append('title', title);
      formData.append('video_url', video);
      formData.append('content', content);

      await onSubmit(formData);
      onClose();
  } catch (error) {
      setError('Có lỗi xảy ra vui lòng thử lại sau');
  }
};


    return (
      <div className='form_detail'>
        <div className='burForm' onClick={onClose}></div>
        <div className='container'>
          <button className='close_btn' onClick={onClose}><CloseIcon /></button>
          <h2>{selectedLesson ? 'Sửa' : 'Thêm'} Bài học</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input_name'>
                <label htmlFor='subject' className='label'>Môn học: </label>
                <select id="subject" className='subject-lesson'required value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} >
                    <option value="">--</option>
                    {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name} {subject.grade}</option>
                ))}
                </select>
            </div>
            <div className='input_name'>
              <label htmlFor='title' className='label'>Tiêu đề: </label>
              <input type='text' name='title' className='input' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className='input_name'>
              <label htmlFor='video' className='label'>Video: </label>
              <input type='file' name='video' className='input' onChange={(e) => setVideo(e.target.files[0])} required />
            </div>
            <div className='input_name'>
              <label htmlFor='content' className='label'>Nội dung: </label>
              <input type='text' name='content' className='input' value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            {error && <div className='error_message' style={{color:'red', marginTop: '20px', textAlign: "center"}}>{error}</div>}
            <div className='btn_add'>
              <button className='confirmAdd' type='submit'>{selectedLesson ? 'Sửa' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default FormLesson
