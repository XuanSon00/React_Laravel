import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'react-data-table-component';
import FormSubject from '../../form/formSubject';
import './subject.css';
import { getSubject, deleteSubject, updateSubject, createSubject,deleteAllSubjects } from '../../api/subject';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const Subject = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);

  const loadSubjects = async () => {
    try {
      const response = await getSubject();
      //console.log('Dữ liệu nhận từ API:', response);
      setSubjects(response);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setSubjects([]);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadSubjects();
  }, []);

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setAddForm(true);
  };
  /* const handleDelete = async (id) => {
    await deleteSubject(id);
    loadSubjects();
  }; */

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
      try {
        await deleteSubject(id);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadSubjects();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa:', error);
        toast.error('Đã xảy ra lỗi khi xóa.',{ autoClose: 500 });
      }
    }
  };
  
  const handleFormSubmit = async (subject) => {
    if (selectedSubject) {
      await updateSubject(selectedSubject.id, subject);
      toast.success('Cập nhật thành công!', { autoClose: 500 });
    } else {
      await createSubject(subject);
      toast.success('Thêm mới thành công!', { autoClose: 500 });
    }
    setAddForm(false);
    loadSubjects();
  };

  const handleFormClose = () => {
    setSelectedSubject(null);
    setAddForm(false);
  };

const handleSelectAll = (e) => {
  const isChecked = e.target.checked;
  setSelectAll(isChecked);
  if (isChecked) {
    setSelectedRows(subjects.map(subject => subject.id));
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
      selector: row => row.name,
      sortable: true,
      
    },
    {
      name: 'Lớp',
      selector: row => row.grade,
      sortable: true,
      
    },
    {
      name: 'Học phí',
      selector: row => row.price,
      sortable: true,
      cell: row => <div>{parseFloat(row.price).toLocaleString('vi-VN')}</div>,
    },
    {
      name: 'Trạng thái',
      selector: row => row.active,
      sortable: true,
      cell: row => <div style={{ color: row.active === 'Mở' ? 'red' : 'gray' }}>{row.active}</div>,
    },
    {
      name: 'Số lượng Học viên',
      selector: row => row.max_students,
      sortable: true,
    },
    {
      name: 'Loại hình giáo dục',
      selector: row =>row.education_type.type , 
      sortable: true,
      cell: row => <div style={{ color: row.education_type.type === 'Classroom' ? 'orange' : 'green' }}>{row.education_type.type}</div>,
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

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.active.toLowerCase().includes(searchTerm.toLowerCase())
);

  /* const handleDeleteSelected = () => {
    selectedRows.forEach(async (id) => {
      await handleDelete(id);
    });
    setSelectedRows([]);
  }; */

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      toast.warning('Bạn phải chọn ít nhất một mục để xóa.',{ autoClose: 500 });
      return;
    }
  
    if (window.confirm('Bạn có chắc chắn muốn xóa các mục đã chọn không?',)) {
      try {
        await Promise.all(selectedRows.map(id => deleteSubject(id)));
        setSelectedRows([]);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadSubjects();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa vai trò:', error);
        toast.error('Đã xảy ra lỗi khi xóa!',{ autoClose: 500 });
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả khóa học không?')) {
      try {
        const response = await deleteAllSubjects();
        toast.success(response.data.message,{ autoClose: 500 });
        setSubjects([]);
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
        <FormSubject
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          selectedSubject={selectedSubject}
        />
      }
      <div className='subject'>
        <div className='subjectData'>
          <h3>Môn học</h3>
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
                data={filteredSubjects}
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

export default Subject
