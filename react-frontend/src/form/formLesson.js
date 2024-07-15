import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './formSubject.css'
import { getSubjects } from '../api/subject';

const FormLesson = ({ onClose, onSubmit, selectedLesson }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [content, setContent] = useState('');

    useEffect(() => {
        const loadSubject = async () => {
            try {
                const response = await getSubjects();
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
        setVideo(selectedLesson.video_url);
        setContent(selectedLesson.content);
    }
}, [selectedLesson]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      idSubject: selectedSubject,
      title: title,
      video_url: video,
      content: content,
    });
    onClose();
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
                <select id="subject" required value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} >
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
              <input type='text' name='video' className='input' value={video} onChange={(e) => setVideo(e.target.value)} required />
            </div>
            <div className='input_name'>
              <label htmlFor='content' className='label'>Nội dung: </label>
              <input type='text' name='content' className='input' value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className='btn_add'>
              <button className='confirmAdd' type='submit'>{selectedLesson ? 'Sửa' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default FormLesson
