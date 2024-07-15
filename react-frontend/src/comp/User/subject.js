import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { getOrderUser } from '../../api/order';
import './subject.css'
const Subject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadScheduleStudent = async () => {
    try {
      const response = await getOrderUser();
      console.log('Dữ liệu nhận từ API:', response.data);
      setSubjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setSubjects([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScheduleStudent();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subjectScheduled.toLowerCase().includes(searchTerm.toLowerCase())
);

const columns = [
  {
      name: 'Tên Môn học',
      selector: row => row.subject.name,
      sortable: true,
      cell: row => <div>{row.subject.name} {row.subject.grade}</div>,
  },
  {
    name: 'Trạng thái',
    selector: row => row.isScheduled ? "đã xếp lớp" : "chưa xếp lớp",
    sortable: true,
    cell: row => <div>{row.isScheduled ? <p className='checked-register'>đã xếp lớp </p> : <p className='uncheck-register'>chưa xếp lớp </p>}</div>,
  },
];

const handleFilterChange = (e) => {
  setSearchTerm(e.target.value);
};

  return (
  <>
  <div className='subject'>
    <div className='subjectData'>
      <h3>Khóa học</h3>
      <div className='data'>
        <div className='btnData'>
          <div className='subjectAdd'>
          </div>
          <div className='searchBox'>
            <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
          </div>
          <div className='subjectDelete'>
          </div>
        </div>
        <div className='table'>
          <DataTable
            className='tableData'
            columns={columns}
            data={filteredSubjects}
            pagination
            paginationPerPage={10}
            progressPending={loading}
            fixedHeader
            highlightOnHover
          />
        </div>
      </div>
        </div>
    </div>
  </>
  )
}

export default Subject
