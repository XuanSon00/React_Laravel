import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getRecipt } from '../../api/order';
const Recipt = () => {
  const [recipts, setRecipts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);


  const fetchRecipt = async () => {
    try {
      const response = await getRecipt();
      setRecipts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
      setLoading(false);
      setRecipts([])
    } 
  };
  
  useEffect(() => {
    fetchRecipt();
  }, []);
  

  
  const handleFilterChange = e => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipts = recipts.filter(
    recipt =>
      recipt.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipt.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipt.quantity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    
    {
      name: 'Mã đơn',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Môn',
      selector: row => row.subject.name,
      sortable: true,
    },
    {
      name: 'số lượng',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Học phí',
      selector: row => row.price,
      sortable: true,
      cell: row => <div>{parseFloat(row.price).toLocaleString('vi-VN')}<sup>đ</sup></div>,
    },
  
  ];


  return (
    <>
      <div className='schedule'>
        <div className='scheduleData'>
          <h3>Hóa đơn </h3>
          <div className='data'>
            <div className='btnData'>
              <div className='scheduleAdd'>
              </div>
              <div className='searchBox'>
                <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
              </div>
              <div className='scheduleDelete'>
              </div>
            </div>
            <div className='table'>
              <DataTable
                className='tableData'
                columns={columns}
                data={filteredRecipts}
                pagination
                paginationPerPage={10}
                progressPending={loading}
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Recipt;
