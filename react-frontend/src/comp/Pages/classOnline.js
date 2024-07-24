import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './detail.css';
import { lessonOnline } from '../../api/lesson';

const ClassOnline = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const loadSubjectDetail = async () => {
        try {
            const response = await lessonOnline(id);
            //console.log(response.data)
            setSubject(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy môn học:', error);
            setSubject(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubjectDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!subject) return <div><h1>Không tìm thấy lớp học</h1></div>;

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <button onClick={handleBack} className='handleback'>Quay lại</button>
            <div className='detail-product'>
                <div className='container'>
                    <div className='img-box'>
                        <img src={subject.image} alt={subject.name} />
                    </div>
                    <div className='detail-box'>
                        <div className='detail-info'>
                            <h2>{subject.name}</h2>
                        </div>
                        <div className='detail-price'>
                            <p>Lớp: {subject.grade}</p>
                            <p>Tối đa: {subject.max_students} người</p>
                            <p>Loại hình giảng dạy: 
                                <span style={{padding: "5px", borderRadius: '10px', color:"#fff", marginLeft:"5px",
                                    background: subject.education_type.type === "Classroom" ? "orange" : "blue"
                                }}>{subject.education_type.type}</span>
                            </p>
                        </div>
                        <div className='describe'>
                            <p>Mô tả:</p>
                            <i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='detail-product'>
                <div className='container'>
                    <div className='class-online'>
                        {subject.lessons && subject.lessons.length > 0 ? (
                                subject.lessons.map((lesson, index) => (
                                    <div key={index} className='lesson-info'>
                                        <h3>{lesson.title}</h3>
                                        <p>Video URL:</p>
                                        <video width="600" controls>
                                        <source src={lesson.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                        <p>Nội dung: {lesson.content}</p>
                                    </div>
                                ))
                        ) : (
                            <p>Hiện tại không có bài học nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassOnline;
