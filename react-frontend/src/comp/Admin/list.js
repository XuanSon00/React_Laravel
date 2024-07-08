import React, { useEffect, useState } from 'react'
import { deleteAllEnroll, deleteEnroll, getEnroll } from '../../api/enroll';
import DataTable from 'react-data-table-component';
import './date.css'
const List = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolls, setEnrolls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEnroll = async () => {
    try {
      const response = await getEnroll(); 
      setEnrolls(response.data);
      setLoading(false);
    } catch (error) {
      console.error('lỗi lấy dữ liệu:', error);
      setEnrolls([]);
    }
  };

  useEffect(() => {
    fetchEnroll();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEnroll(id);
      fetchEnroll();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng đăng ký:', error);
    }
  };
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedRows) {
        await handleDelete(id);
      }
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected items:', error);
    }
  };
  const handleDeleteAll = async () => {
    await deleteAllEnroll();
    setEnrolls([]);
  };
  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      name: '',
      selector: row => <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} />,
      sortable: false,
    },
    {
      name: 'Tên Người dùng',
      selector: row => row.user.name,
      sortable: true,
    },
    {
      name: 'Khóa học',
      selector: row => row.subject.name,
      sortable: true,
    },
    {
      name: 'Lớp',
      selector: row => row.subject.grade,
      sortable: true,
    },
    /*  {
      name: 'Giảng viên',
      selector: row => row.teacher.name,
      sortable: true,
    },  */
    {
      name: 'Thời gian bắt đầu',
      selector: row => row.schedule.startTime,
      sortable: true,
    },
    {
      name: 'Thời gian kết thúc',
      selector: row => row.schedule.endTime,
      sortable: true,
    },
    {
      name: 'Lịch học',
      selector: row => row.schedule.schedule,
      sortable: true,
    },
    {
      name: '',
      cell: row => (
        <>
          <button className='deleteBtn' onClick={() => handleDelete(row.id)}>Xóa</button>
        </>
      ),
      sortable: false,
    },
  ];
  const filteredEnroll = enrolls && enrolls.filter(enroll =>
    (enroll.user.name && enroll.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (enroll.subject.name && enroll.subject.name.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (enroll.subject.grade && enroll.subject.grade.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (enroll.schedule.startTime && enroll.schedule.startTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (enroll.schedule.endTime && enroll.schedule.endTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (enroll.schedule.schedule && enroll.schedule.schedule.toLowerCase().includes(searchTerm.toLowerCase()))
);

  return (
    <>
      <div className='schedule'>
        <div className='scheduleData'>
          <h3>Danh sách </h3>
          <div className='data'>
            <div className='btnData'>
              <div className='scheduleAdd'>
              </div>
              <div className='searchBox'>
                <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
              </div>
              <div className='scheduleDelete'>
                <button onClick={handleDeleteSelected}>Xóa chọn</button>
                <button onClick={handleDeleteAll}>Xóa tất cả</button>
              </div>
            </div>
            <div className='table'>
              <DataTable
                className='tableData'
                columns={columns}
                data={enrolls}
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
  )
}

export default List
