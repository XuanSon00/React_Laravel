import React, { useContext, useEffect, useState } from 'react';
import Nav from './nav';
import { getSubjects } from '../../api/subject';
import InfoIcon from '@mui/icons-material/Info';
import './home.css';
import { CartContext } from '../context/cartContext';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getOrderUser } from '../../api/order';

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredGrade, setFilteredGrade] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  const loadSubjects = async () => {
    try {
      const response = await getSubjects();
      console.log('Dữ liệu nhận từ API:', response);
      setSubjects(response);
      setFilteredGrade(response);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setSubjects([]);
    }
  };
  
  const loadOrders = async () => {
    try {
      const response = await getOrderUser();
      //console.log('Dữ liệu nhận từ API:', response.data);
      setOrders(response.data);
    } catch (error) {
      //console.error('Lỗi khi lấy lịch sửmôn học:', error);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadSubjects();
    loadOrders();
  }, []);

  const filterGrade = (selectedGrade) => {
    let filtered = subjects;
    if (selectedGrade !== "") {
      filtered = subjects.filter(subject => subject.grade === selectedGrade);
    }
    setFilteredGrade(filtered.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };
  
  /* const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  ); */

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredGrade(subjects.filter(subject =>
      subject.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };
  /* const isPurchased = (id) =>{
    return orders.some( order => order.idSubject === id )
  } */

  
  return (
    <>
  <div><Toaster position="top-center" reverseOrder={false} /></div>
      <Nav handleFilterChange={handleFilterChange} />
      <div className='home'>
        <div className='top_banner'></div>
        <div className='trending'>
          <div className='container'>
            <div className='left_box'>
              <div className='header'>
                <div className='heading'>
                  <h2 onClick={() => loadSubjects()}> Tất cả Khóa học</h2>
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
                  {filteredGrade.map((subject) => {
                    return (
                      <div className='box' key={subject.id}>
                        <Link to={`/subjects/${subject.id}`} className='img_box'>
                          <p className='educationType' style={{background: subject.education_type.type==="Classroom" ? "orange" : "blue"}}>
                            {subject.education_type.type}
                          </p>
                          <img src={subject.image} alt='' style={{ height: 180 }} />
                          <div className='icon'>
                            <div className='icon_box'>
                              <InfoIcon />
                            </div>
                          </div>
                        </Link> 
                        <div className='info'>
                          <div className='info-subject'>
                            <h3>{subject.name}</h3>
                            <span>{subject.grade}</span>
                          </div>
                          <div className='info-price'>
                            <span>Học Phí: </span>
                            <p>{Math.floor(parseFloat(subject.price.replace(/\./g, '').replace(',', '.'))).toLocaleString('vi-VN')} <sup>đ</sup></p>
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
                    );
                  })}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
