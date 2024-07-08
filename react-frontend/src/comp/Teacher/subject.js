import React, { useEffect, useState } from 'react'
import { getScheduleTeacher } from '../../api/schedule';
import DataTable from 'react-data-table-component';

const Subject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadScheduleTeacher = async () => {
    try {
      const response = await getScheduleTeacher();
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
    loadScheduleTeacher();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.startTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.endTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.schedule.toLowerCase().includes(searchTerm.toLowerCase()) 
);

const columns = [
  {
      name: 'Tên Môn học',
      selector: row => row.subject.name,
      sortable: true,
  },
  {
      name: 'Lớp',
      selector: row => row.grade,
      sortable: true,
  },
  {
    name: 'Thời gian bắt đầu',
    selector: row => row.startTime,
    sortable: true,
  },
  {
    name: 'Thời gian kết thúc',
    selector: row => row.endTime,
    sortable: true,
  },
  {
    name: 'Ngày',
    selector: row => row.schedule,
    sortable: true,
  },
  {
    name: 'Thời gian',
    selector: row => row.schedule,
    sortable: true,
    cell: row => <div>{row.schedule === "3-5-7" ? '18g30-21g30' : '8g30-11g30'}</div>,
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
