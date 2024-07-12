import React, { useEffect, useState } from 'react';
import { getScheduleStudent, getStudentsBySchedule } from '../../api/schedule';
import DataTable from 'react-data-table-component';
import StudentList from '../../form/studentList';
import { getSubjects } from '../../api/subject';
import { getLession } from '../../api/lession';
import FormLession from '../../form/formLession';

const Lession1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [lessions, setLession] = useState([]);

  const loadSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
      setSubjects([]);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleOpenList = async (idSubject) => {
    try {
      const response = await getLession(idSubject);
      setLession(response.data);
      setSelectedSchedule(idSchedule);
      setOpenList(true);
    } catch (error) {
      console.error('Lỗi lấy danh sách bài học:', error);
    }
  };

  const filteredSchedules = schedules.filter(schedule =>
    (subject.name && schedule.subject.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (subject.grade && schedule.grade.toString().toLowerCase().includes(searchTerm.toLowerCase())) 
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
        <FormLession
          onClose={handleFormClose}
          lessions={lessions}
        />
      )}
      <div className='subject'>
        <div className='subjectData'>
          <h3>Bài học</h3>
          <div className='data'>
            <div className='btnData'>
              <div className='subjectAdd'></div>
              <div className='searchBox'>
                <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm...' />
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

export default Lession1;
