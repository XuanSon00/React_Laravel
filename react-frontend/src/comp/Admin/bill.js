import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './account.css';
import { getAllRecipt } from '../../api/order';


const Bill = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const loadRecipt = async () => {
    try {
      const response = await getAllRecipt();
      console.log('Dữ liệu nhận từ API:', response);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setOrders([]);
      setLoading(false);
    }
  };


  useEffect(() => {
    loadRecipt();
  }, []);

  const columns = [
    {
      name: 'Tên',
      selector: (row) => row.user.email,
      sortable: true,
      cell: (row) => <div>{row.user.email}</div>,
    },
    {
      name: 'Khóa học',
      selector: (row) => row.subject.name,
      sortable: true,
      cell: (row) => <div>{row.subject.name} {row.subject.grade}</div>,
    },
    {
        name: 'Mã thanh toán',
        selector: (row) => row.id,
        sortable: true,
        cell: (row) => <div style={{color:"red"}}>0-{row.id}</div>,
      },
    {
      name: 'Học phí',
      selector: (row) => row.subject.price,
      sortable: true,
      cell: (row) => <div>{parseFloat(row.subject.price).toLocaleString('vi-VN')} <sup>đ</sup></div>,
      },
    {
      name: 'Ngày tạo',
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => <div>{new Date(row.created_at).toLocaleDateString('vi-VN')}</div>,
    },
  ];

  const filteredRecipt = orders.filter(order =>
    order.user.email && order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.subject.name && order.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.subject.price && order.subject.price.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className='account'>
        <div className='accountData'>
          <h3>Tài khoản</h3>
          <div className='data'>
            <div className='btnData'>
              <div className='searchBox'>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={handleFilterChange}
                  placeholder='Tìm kiếm tài khoản...'
                />
              </div>
              <div className='accountDelete'>
              </div>
            </div>
            <div className='tableA'>
              <DataTable
                className='tableData'
                columns={columns}
                data={filteredRecipt}
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

export default Bill;
