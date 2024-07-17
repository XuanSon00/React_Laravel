import React, { useEffect, useState } from 'react';
import { deleteUser, deleteAllUser, getUsers, updateUser, userInfo } from '../../api/account';
import DataTable from 'react-data-table-component';
import FormAccount from '../../form/formAccount';
import './account.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';


const Account = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const loadUser = async () => {
    try {
      const response = await getUsers();
      console.log('Dữ liệu nhận từ API:', response);
      setUsers(response);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setUsers([]);
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const response = await userInfo();
      console.log('Dữ liệu nhận từ API:', response);
      setCurrentUser(response);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
    }
  };

  useEffect(() => {
    loadUser();
    loadCurrentUser();
  }, []);

  const handleEdit = (user) => {
    setSelectedAccount(user);
    setEditForm(true);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUser();
  };
  
  const handleDeleteAll = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả người dùng không phải Admin không?',)) {
      try {
        const response = await deleteAllUser();
        loadUser();
        toast.success(response.data.message,{ autoClose: 500 });
      } catch (error) {
        toast.error('Không còn người dùng khác ngoài Admin',{ autoClose: 500 });
      console.error(error);
      }
    }
  };


  const handleFormSubmit = async (user) => {
    if (selectedAccount) {
      await updateUser(selectedAccount.id, user);
    }
    setEditForm(false);
    loadUser();
  };

  const handleFormClose = () => {
    setSelectedAccount(null);
    setEditForm(false);
  };

  const columns = [
    {
      name: '',
      selector: row => currentUser && row.id !== currentUser.id 
      ? <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} /> 
      : null,
    sortable: false,
    },
    {
      name: 'Tên',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div>{row.email}</div>,
    },
    {
      name: 'Trạng thái',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <div style={{ color: row.status === 0 ? 'gray' : 'red' }}>{row.status === 0 ? 'Đang đóng' : 'Đang hoạt động'}</div>,
    },
    {
      name: 'Vai trò',
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <div style={{ color: row.role === 'Admin' ? 'red' : row.role === 'Teacher' ? 'blue' : 'green' }}>{row.role}</div>
      ),
    },
    {
      name: 'Ngày tạo',
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => <div>{new Date(row.created_at).toLocaleDateString('vi-VN')}</div>,
    },
    {
      name: '',
      cell: (row) => (
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
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const filteredAccount = users.filter(user => {
    //nếu dữ liệu là null hoặc undefined, gắn giá trị ''
    const name = user.name || ''; 
    const email = user.email || ''; 
    const role = user.role || '';
  
    return (
      name && name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email && email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role && role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  const handleDeleteSelected = async () => {
    await Promise.all(selectedRows.map(async (id) => {
      await handleDelete(id);
    }));
    setSelectedRows([]);
  };

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {editForm && (
        <FormAccount onClose={handleFormClose} onSubmit={handleFormSubmit} selectedAccount={selectedAccount} />
      )}
      <div className='account'>
        <div className='accountData'>
          <h3>Tài khoản</h3>
          <div className='data'>
            <div className='btnData'>
              <div className='searchBox'>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={handleFilterChange}
                  placeholder='Tìm kiếm tài khoản...'
                />
              </div>
              <div className='accountDelete'>
                <button onClick={handleDeleteSelected}>Xóa chọn</button>
                <button onClick={handleDeleteAll}>Xóa tất cả</button>
              </div>
            </div>
            <div className='tableA'>
              <DataTable
                className='tableData'
                columns={columns}
                data={filteredAccount}
                pagination
                paginationPerPage={5}
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

export default Account;
