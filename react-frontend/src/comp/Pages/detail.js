// detail.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // lấy id từ URL
import { detailSubject } from '../../api/subject';
import './detail.css'
import { CartContext } from '../context/cartContext';
const SubjectDetail = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext)
    //const [orders, setOrders] = useState([]);

    const loadSubjectDetail = async () => {
        try {
          const response = await detailSubject(id); // Truyền id vào hàm
          //console.log('Dữ liệu nhận từ API:', response.data);
          setSubject(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Lỗi khi lấy môn học:', error);
          setSubject(null);
          setLoading(false);
        }
    };
    /* const loadOrders = async () => {
        try {
          const response = await getOrderUser();
          //console.log('Dữ liệu nhận từ API:', response.data);
          setOrders(response.data);
        } catch (error) {
          //console.error('Lỗi khi lấy lịch sửmôn học:', error);
          setOrders([]);
        }
      }; */

    useEffect(()=>{
        loadSubjectDetail();
        //loadOrders();
    }, [id]);

    /* const isPurchased = (id) =>{
        // console.log('orders:', orders);
        // console.log('subject id:', id);
        return  orders.some(order => order.idSubject === id);
    } */
    
    if (loading) return <div>Loading...</div>;
    if (!subject) return <div><h1>không tìm thấy khóa học</h1></div>;

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
                        <p>{Math.floor(parseFloat(subject.price.replace(/\./g, '').replace(',', '.'))).toLocaleString('vi-VN')} <sup>đ</sup></p>
                    </div>
                    <div className='detail-price'>
                        <p>Lớp: {subject.grade}</p>
                        <p>Tối đa: {subject.max_students} người</p>
                        <p>Loại hình giảng dạy: 
                            <span style={{
                                padding: "5px", 
                                borderRadius: '10px', 
                                color:"#fff", 
                                marginLeft:"5px",
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
                    <div className='addTocart'>
                        {/* {isPurchased(subject.id) ? (
                            <button className='btn-disable' disabled> Đã mua</button>
                        ) :(
                          <button className='btn' onClick={() => addToCart(subject)}>Mua</button>
                        )
                        } */}
                        <button className='btn' onClick={() => addToCart(subject)}>Mua</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default SubjectDetail;
