import React, { useEffect, useState } from 'react';
import { getScheduleStudent, getStudentsBySchedule } from '../../api/schedule';
import DataTable from 'react-data-table-component';
import StudentList from '../../form/studentList';

const Subject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schedules, setSchdules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [students, setStudents] = useState([]);

  const fetchSchedules = async () => {
    try {
      const response = await getScheduleStudent();
      setSchdules(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
      setSchdules([]);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleOpenList = async (idSchedule) => {
    try {
      const response = await getStudentsBySchedule(idSchedule);
      setStudents(response.data);
      setSelectedSchedule(idSchedule);
      setOpenList(true);
    } catch (error) {
      console.error('Lỗi lấy danh sách học sinh:', error);
    }
  };

  const filteredSchedules = schedules.filter(schedule =>
    (schedule.subject.name && schedule.subject.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.grade && schedule.grade.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.schedule && schedule.schedule.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.available_seats && schedule.available_seats.toLowerCase().includes(searchTerm.toLowerCase())) 
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
      name: 'Số buổi',
      selector: row => '50',
      sortable: true,
    },
    {
      name: 'Số lượng chỗ còn lại',
      selector: row => (
        <span>
          <span style={{ color: 'red' }}>{row.available_seats}</span> / <span>{row.subject.max_students}</span>
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Danh sách',
      cell: row => <div><button onClick={() => handleOpenList(row.id)} className='studentList'>Mở</button></div>,
    },
  ];

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormClose = () => {
    setSelectedSchedule(null);
    setOpenList(false);
  };

  return (
    <>
      {openList && (
        <StudentList
          onClose={handleFormClose}
          students={students}
        />
      )}
      <div className='subject'>
        <div className='subjectData'>
          <h3>Lớp học</h3>
          <div className='data'>
            <div className='btnData'>
              <div className='subjectAdd'></div>
              <div className='searchBox'>
                <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
              </div>
              <div className='subjectDelete'></div>
            </div>
            <div className='table'>
              <DataTable
                className='tableData'
                columns={columns}
                data={filteredSchedules}
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
  );
};

export default Subject;
