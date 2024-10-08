import React, { useEffect, useState } from 'react';
import FormDate from '../../form/formDate';
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'react-data-table-component';
import { getSchedule, deleteDate, deleteAllDate } from '../../api/schedule';
import './date.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const Date = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [schedules, setSchdules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const response = await getSchedule(); 
      setSchdules(response.data);
      setLoading(false);
    } catch (error) {
      console.error('lỗi lấy dữ liệu:', error);
      setSchdules([]);
    }
  };


  useEffect(() => {
    fetchSchedules();
  }, []);

  
  const handleEdit = (date) => {
    setSelectedDate(date);
    setAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
      try {
        await deleteDate(id);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        fetchSchedules();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa:', error);
        toast.error('Đã xảy ra lỗi khi xóa.',{ autoClose: 500 });
      }
    }
  };

  const handleFormClose = () => {
    setSelectedDate(null);
    setAddForm(false);
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  /* const handleDeleteSelected = async () => {
    try {
      for (const id of selectedRows) {
        await handleDelete(id);
      }
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected items:', error);
    }
  }; */

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      toast.warning('Bạn phải chọn ít nhất một mục để xóa.',{ autoClose: 500 });
      return;
    }
  
    if (window.confirm('Bạn có chắc chắn muốn xóa các mục đã chọn không?',)) {
      try {
        await Promise.all(selectedRows.map(id => deleteDate(id)));
        setSelectedRows([]);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        fetchSchedules();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa', error);
        toast.error('Đã xảy ra lỗi khi xóa!',{ autoClose: 500 });
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả lóp học?')) {
      try {
        const response = await deleteAllDate();
        setSchdules([]);
        fetchSchedules();
        toast.success(response.data.message,{ autoClose: 500 });
      } catch (error) {
        toast.error('có lỗi khi xóa',{ autoClose: 500 });
      console.error(error);
      }
    }
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
      name: 'Tên Môn học',
      selector: row => row.subject.name,
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
      name: 'Lịch học',
      selector: row => row.schedule,
      sortable: true,
    },
    {
      name: 'Số buổi',
      selector: row => '50',
      sortable: true,
    },
    {
      name: 'Giảng viên',
      selector: row => row.teacher.name,
      sortable: true,
    },
    {
      name: 'Loại hình giáo dục',
      selector: row =>row.subject.education_type.type , 
      sortable: true,
      cell: row => <div style={{ color: row.subject.education_type.type === 'Classroom' ? 'orange' : 'green' }}>{row.subject.education_type.type}</div>,
    },
    {
      name: '',
      cell: row => (
        <>
          <button className='editForm' onClick={() => handleEdit(row)}><EditIcon /></button>
          <button className='deleteBtn' onClick={() => handleDelete(row.id)}><DeleteIcon /></button>
        </>
      ),
      sortable: false,
    },
  ];

  const filteredSchedules = schedules.filter(schedule =>
    (schedule.subject.name && schedule.subject.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.startTime && schedule.startTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.endTime && schedule.endTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.teacher.name && schedule.teacher.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.schedule && schedule.schedule.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (schedule.available_seats && schedule.available_seats.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  return (
    <>
      {AddForm && (
        <FormDate
          onClose={handleFormClose}
          selectedDate={selectedDate}
          setLoading={setLoading}
          fetchSchedules={fetchSchedules}
        />
      )}
      <div className='schedule'>
        <div className='scheduleData'>
          <h3>Lớp học </h3>
          <div className='data'>
            <div className='btnData'>
              <div className='scheduleAdd'>
                <button onClick={() => setAddForm(true)}><AddIcon /> Thêm</button>
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
                data={filteredSchedules}
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

export default Date;
