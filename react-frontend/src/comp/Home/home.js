import React, { useContext, useEffect, useState } from 'react';
import Nav from './nav';
import { getSubjects } from '../../api/subject';
import InfoIcon from '@mui/icons-material/Info';
import './home.css';
import { CartContext } from '../context/cartContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredGrade, setFilteredGrade] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadSubjects = async (page = 1) => {
    try {
      const response = await getSubjects(page);
      console.log('Dữ liệu nhận từ API:', response);
      setSubjects(response.data);
      setFilteredGrade(response.data);
      setTotalPages(response.last_page);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setSubjects([]);
    }
  };

  const loadAllSubjects = async () => {
    try {
      const allSubjects = [];
      for (let p = 1; p <= totalPages; p++) {
        const response = await getSubjects(p);
        allSubjects.push(...response.data);
      }
      return allSubjects;
    } catch (error) {
      console.error('Lỗi khi lấy tất cả môn học:', error);
      return [];
    }
  };

  useEffect(() => {
    loadSubjects(page);
  }, [page]);

  const filterGrade = async (selectedGrade) => {
    let allSubjects = await loadAllSubjects();
    let filtered = allSubjects;
    if (selectedGrade !== "") {
      filtered = allSubjects.filter(subject => subject.grade === selectedGrade);
    }
    setFilteredGrade(filtered.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleFilterChange = async (e) => {
    setSearchTerm(e.target.value);
    let allSubjects = await loadAllSubjects();
    setFilteredGrade(allSubjects.filter(subject =>
      subject.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  const handlePage = (newPage) =>{
    setPage(newPage);
  }

  return (
    <>
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
                            <button className='btn' onClick={() => addToCart(subject)}>Mua</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='pagination'>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`page-btn ${page === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
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
