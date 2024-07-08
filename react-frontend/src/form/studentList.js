import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CloseIcon from '@mui/icons-material/Close';
import './studentList.css';

const StudentList = ({ onClose, students }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.id && student.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      name: 'Mã ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Tên',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
  ];

  return (
    <>
    <div className='burForm' onClick={onClose}></div>
      <div className='listStudent'>
        <div className='scheduleData'>
          <button className='close_btn' onClick={onClose}><CloseIcon /></button>
          <h3>Danh sách</h3>
          <div className='data'>
            <div className='btnData'>
              <div className='scheduleAdd'></div>
              <div className='searchBox'>
                <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm học sinh...' />
              </div>
              <div className='scheduleDelete'></div>
            </div>
            <div className='table'>
              <DataTable
                className='tableData'
                columns={columns}
                data={filteredStudents}
                pagination
                paginationPerPage={10}
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentList;
