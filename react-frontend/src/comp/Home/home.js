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
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentGrade, setCurrentGrade] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const loadSubjects = async (page = 1, grade = '') => {
    try {
      const response = await getSubjects(page, 10, grade);
      console.log('Dữ liệu nhận từ API:', response);
      setSubjects(response.data);
      setFilteredGrade(response.data);
      setTotalPages(response.last_page);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setSubjects([]);
    }
  };

  useEffect(() => {
    loadSubjects(page, currentGrade);
  }, [page, currentGrade]);

  const filterGrade = async (selectedGrade) => {
    setCurrentGrade(selectedGrade);
    setPage(1);
    try {
      const response = await getSubjects(1, 10, selectedGrade);
      setFilteredGrade(response.data);
      setTotalPages(response.last_page);
      setIsFiltered(true); 
    } catch (error) {
      console.error('Lỗi khi lọc môn học:', error);
      setFilteredGrade([]);
      setTotalPages(1);
    }
  };

  const handleFilterChange = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    try {
      const response = await getSubjects(1, 10, currentGrade, value); 
      setFilteredGrade(response.data);
      setTotalPages(response.last_page); 
    } catch (error) {
      console.error('Lỗi khi tìm kiếm môn học:', error);
      setFilteredGrade([]);
    }
    setIsSearching(e.target.value !== '');
  };
  

  const handlePage = (newPage) => {
    setPage(newPage);
  }

  const loadALlSubject = () =>{
    setCurrentGrade('');
    loadSubjects(1);
  }

  return (
    <>
      <Nav isSearching={isSearching} handleFilterChange={handleFilterChange} />
      <div className='home'>
        <div className='top_banner'></div>
        <div className='trending'>
          <div className='container'>
            <div className='left_box'>
              <div className='header'>
                <div className='heading'>
                  <h2 onClick={() => loadALlSubject()}>Tất cả Khóa học</h2>
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
                  {filteredGrade.map((subject) => (
                    <div className='box' key={subject.id}>
                      <Link to={`/subjects/${subject.id}`} className='img_box'>
                        <p className='educationType' style={{background: subject.education_type.type === "Classroom" ? "orange" : "blue"}}>
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
                  ))}
                </div>
                <div className='pagination'>
                

                  {/* {//phân số trang theo dữ liệu
                    !isFiltered && Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`page-btn ${page === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))} */}
                </div>
                {
                  totalPages > 1 && (
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
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
