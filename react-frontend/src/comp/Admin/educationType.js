import React, { useEffect, useState } from 'react'
import { createEducation, deleteAllEducation, deleteEducation, getEducation, updateEducation } from '../../api/edu';
import FormEduType from '../../form/formEduType';
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const EducationType = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadTypes = async () => {
    try {
      const response = await getEducation()
      setTypes(response.data)
      setLoading(false);
      } catch (error) {
        console.error('Error loading edu type:', error);
        setTypes([]);    
      }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleEdit = (type) => {
  setSelectedType(type);
  setAddFormVisible(true);
  };

  /* const handleDelete = async (id) => {
    await deleteEducation(id);
    loadTypes();
  };
 */
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
      try {
        await deleteEducation(id);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadTypes();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa:', error);
        toast.error('Đã xảy ra lỗi khi xóa.',{ autoClose: 500 });
      }
    }
  };

  const handleFormSubmit = async (type) => {
    if (selectedType) {
      await updateEducation(selectedType.id, type);
    } else {
      await createEducation(type);
    }
    setAddFormVisible(false);
    loadTypes();
  };

  const handleFormClose = () => {
    setSelectedType(null);
    setAddFormVisible(false);
  };

  const columns = [
  {
    name: '',
    selector: row => <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} />,
    sortable: false,
    width: '200px'
  },
  {
    name: 'Loại hình giáo dục',
    selector: row => row.type,
    sortable: true,
    cell: row => <div style={{ color: row.type === 'Classroom' ? 'red' : "green" }}>{row.type}</div>,
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

  const customStyles = {
    table: {
      style: {
        margin: '0 auto'
      },
    },
    pagination: {
      style: {
        width: 'fit-content',  
        margin: '0 auto'
      },
    },
  }
  
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  } else {
    setSelectedRows([...selectedRows, id]);
    }
  };

  const filteredEduType = types.filter(type =>
    type.type.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      toast.warning('Bạn phải chọn ít nhất một mục để xóa.',{ autoClose: 500 });
      return;
    }
  
    if (window.confirm('Bạn có chắc chắn muốn xóa các mục đã chọn không?',)) {
      try {
        await Promise.all(selectedRows.map(id => deleteEducation(id)));
        setSelectedRows([]);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadTypes();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa vai trò:', error);
        toast.error('Đã xảy ra lỗi khi xóa!',{ autoClose: 500 });
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả loại hình giáo dục không?')) {
      try {
        const response = await deleteAllEducation();
        toast.success(response.data.message,{ autoClose: 500 });
        setTypes([]);
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
  {addFormVisible  &&
    <FormEduType
      onClose={handleFormClose}
      onSubmit={handleFormSubmit}
      selectedType={selectedType}
    />
  }
  <div className='role'>
    <div className='roleData'>
      <h3>Loại hình giáo dục</h3>
      <div className='data'>
        <div className='btnData'>
          <div className='roleAdd'>
            <button onClick={() => setAddFormVisible(true)}><AddIcon /> Thêm</button>
          </div>
          <div className='searchBox'>
            <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm...' />
          </div>
          <div className='roleDelete'>
            <button onClick={handleDeleteSelected}>Xóa chọn</button>
            <button onClick={handleDeleteAll}>Xóa tất cả</button>
          </div>
        </div>
        <div className='table'>
          <DataTable
            className='tableData'
            columns={columns}
            data={filteredEduType}
            pagination
            paginationPerPage={5}
            progressPending={loading}
            highlightOnHover
            fixedHeader
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  </div>
</>
)
}

export default EducationType
