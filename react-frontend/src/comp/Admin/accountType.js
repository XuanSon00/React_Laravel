import React, { useEffect, useState } from 'react'
import FormRole from '../../form/formRole'
import './accountType.css';
import AddIcon from '@mui/icons-material/Add';
import { createRole, deleteAllRoles, deleteRole, getRoles, updateRole } from '../../api/accountType'
import DataTable from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const AccountType = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRoles = async () => {
    try {
        const response = await getRoles();
        setRoles(response);
        setLoading(false);
    } catch (error) {
        console.error('Error loading roles:', error);
        setRoles([]);
    }
};

useEffect(() => {
    loadRoles();
}, []);

const handleEdit = (role) => {
    setSelectedRole(role);
    setAddFormVisible(true);
};

const handleDelete = async (id) => {
    await deleteRole(id);
    loadRoles();
};

const handleFormSubmit = async (role) => {
    if (selectedRole) {
        await updateRole(selectedRole.id, role);
    } else {
        await createRole(role);
    }
    setAddFormVisible(false);
    loadRoles();
};

const handleFormClose = () => {
    setSelectedRole(null);
    setAddFormVisible(false);
};

const columns = [
  {
      name: '',
      selector: row => <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} />,
      sortable: false,
  },
  {
      name: 'Loại tài khoản',
      selector: row => row.name,
      sortable: true,
      cell: row => <div style={{ color: row.name === 'Admin' ? 'red' : (row.name === 'Teacher' ? 'blue' : 'green') }}>{row.name}</div>,
  },
  {
      name: 'Trạng thái',
      selector: row => row.status,
      sortable: true,
      cell: row => <div style={{ color: row.status === 0 ? 'gray' : 'red' }}>{row.status === 0 ? 'Đang đóng' : 'Đang hoạt động'}</div>,
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
};

const filteredRoles = roles.filter(role =>
  role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  role.status.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleDeleteSelected = async () => {
  await Promise.all(selectedRows.map(id => deleteRole(id)));
  setSelectedRows([]);
  loadRoles();
};

const handleDeleteAll = async () => {
  await deleteAllRoles();
  setRoles([]);
};

const handleFilterChange = (e) => {
  setSearchTerm(e.target.value);
};

return (
  <>
    {addFormVisible  &&
      <FormRole
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        selectedRole={selectedRole}
      />
    }
    <div className='role'>
      <div className='roleData'>
        <h3>Loại Tài khoản</h3>
        <div className='data'>
          <div className='btnData'>
            <div className='roleAdd'>
              <button onClick={() => setAddFormVisible(true)}><AddIcon /> Thêm</button>
            </div>
            <div className='searchBox'>
              <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
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
              data={filteredRoles}
              pagination
              paginationPerPage={5}
              progressPending={loading}
              highlightOnHover
              fixedHeader
            />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default AccountType
