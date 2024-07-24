import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'react-data-table-component';
import './subject.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { createLesson, deleteAllLessons, deleteLesson, getLesson, updateLesson } from '../../api/lesson';
import FormLesson from '../../form/formLesson';
import { toast } from 'react-toastify';

const Lesson = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);

  const loadLesson = async () => {
    try {
      const response = await getLesson();
      //console.log('Dữ liệu nhận từ API:', response);
      setLessons(response);
      setLoading(false);
      } catch (error) {
      console.error('Lỗi khi lấy danh sách bài học:', error);
      setLessons([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLesson();
  }, []);

  const handleEdit = (lesson) => {
    setSelectedLesson(lesson);
    setAddForm(true);
  };

  /* const handleDelete = async (id) => {
    await deleteLesson(id);
    loadLesson();
  }; */

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
      try {
        await deleteLesson(id);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadLesson();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa:', error);
        toast.error('Đã xảy ra lỗi khi xóa.',{ autoClose: 500 });
      }
    }
  };

  const handleFormSubmit = async (lesson) => {
    if (selectedLesson) {
      await updateLesson(selectedLesson.id, lesson);
      toast.success('Cập nhật thành công!', { autoClose: 500 });
    } else {
      await createLesson(lesson);
      toast.success('Thêm mới thành công!', { autoClose: 500 });
    }
    setAddForm(false);
    loadLesson();
  };

  const handleFormClose = () => {
    setSelectedLesson(null);
    setAddForm(false);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
        setSelectedRows(lessons.map(lesson => lesson.id));
    } else {
        setSelectedRows([]);
    }
  };

  const customStyles = {
    table: {
      style: {
      width: 'auto',
      },
    },
    headCells: { 
      style: {
      whiteSpace: 'nowrap',
      }
    },
    cells: { 
      style: {
      whiteSpace: 'nowrap', 
      }
    },
  };

  const columns = [
    {
      name: <input type='checkbox' className="btncheck" checked={selectAll} onChange={handleSelectAll} />,
      selector: row => <input type='checkbox' className="btncheck" checked={selectedRows.includes(row.id)} onChange={() => handleCheckboxChange(row.id)} />,
      sortable: false,
    },
    {
      name: 'Tên Môn học',
      selector: row => row.subject.name,
      sortable: true,
      cell: row => <div>{row.subject.name} Lớp {row.subject.grade}</div>,
    },
    {
      name: 'Tiêu đề',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Video',
      selector: row => row.video_url,
      sortable: true,
    },
    {
      name: 'Nội dung ',
      selector: row =>row.content , 
      sortable: true,
    },
    {
      name: 'Ngày tạo',
      selector: row => row.created_at,
      sortable: true,
      cell: row => <div>{new Date(row.created_at).toLocaleDateString('vi-VN')}</div>,
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

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }

  const filteredLesson = lessons.filter(lesson =>
      lesson.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.video_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      toast.warning('Bạn phải chọn ít nhất một mục để xóa.',{ autoClose: 500 });
      return;
    }
  
    if (window.confirm('Bạn có chắc chắn muốn xóa các mục đã chọn không?',)) {
      try {
        await Promise.all(selectedRows.map(id => deleteLesson(id)));
        setSelectedRows([]);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadLesson();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa vai trò:', error);
        toast.error('Đã xảy ra lỗi khi xóa!',{ autoClose: 500 });
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả bài học không?')) {
      try {
        const response = await deleteAllLessons();
        setLessons([]);
        loadLesson();
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

return (
  <>
  {AddForm &&
    <FormLesson
      onClose={handleFormClose}
      onSubmit={handleFormSubmit}
      selectedLesson={selectedLesson}
    />
  }
  <div className='subject'>
    <div className='subjectData'>
      <h3>Bài học</h3>
      <div className='data'>
        <div className='btnData'>
          <div className='subjectAdd'>
            <button onClick={() => setAddForm(true)}><AddIcon /> Thêm</button>
          </div>
          <div className='searchBox'>
            <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
          </div>
          <div className='subjectDelete'>
            <button onClick={handleDeleteSelected}>Xóa chọn</button>
            <button onClick={handleDeleteAll}>Xóa tất cả</button>
          </div>
        </div>
        <div className='table'>
          <DataTable
            className='tableData'
            columns={columns}
            data={filteredLesson}
            pagination
            paginationPerPage={10}
            progressPending={loading}
            fixedHeader
            highlightOnHover
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  </div>
</>
)
}

export default Lesson
