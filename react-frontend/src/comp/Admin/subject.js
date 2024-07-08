import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'react-data-table-component';
import FormSubject from '../../form/formSubject';
import './subject.css';
import { getSubjects, deleteSubject, updateSubject, createSubject,deleteAllSubjects } from '../../api/subject';

const Subject = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSubjects = async () => {
    try {
      const response = await getSubjects();
      console.log('Dữ liệu nhận từ API:', response);
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
  const handleDelete = async (id) => {
    await deleteSubject(id);
    loadSubjects();
  };

  const handleFormSubmit = async (subject) => {
    if (selectedSubject) {
      await updateSubject(selectedSubject.id, subject);
    } else {
      await createSubject(subject);
    }
    setAddForm(false);
    loadSubjects();
  };

  const handleFormClose = () => {
    setSelectedSubject(null);
    setAddForm(false);
  };

  const columns = [
      {
          name: '',
          selector: row => <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} />,
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
          name: 'Ngày tạo',
          selector: row => row.created_at,
          sortable: true,
          cell: row => <div>{new Date(row.created_at).toLocaleDateString('vi-VN')}</div>,
        },
      {
          name: '',
          cell: row => (
              <>
                <button className='editForm' onClick={() => handleEdit(row)}>Sửa</button>
                <button className='deleteBtn' onClick={() => handleDelete(row.id)}>Xóa</button>
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


  const handleDeleteSelected = () => {
    selectedRows.forEach(async (id) => {
      await handleDelete(id);
    });
    setSelectedRows([]);
  };

  const handleDeleteAll = async () =>{
      await deleteAllSubjects();
      setSubjects([]);
  }
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subject
