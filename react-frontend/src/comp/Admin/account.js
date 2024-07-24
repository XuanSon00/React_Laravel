import React, { useEffect, useState } from 'react';
import { deleteUser, deleteAllUser, getUsers, updateUser, userInfo, getIdAdmin } from '../../api/account';
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
  const [idAdmin, setIdAdmin] = useState([]);

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

  const loadIdAdmin = async () => {
    try {
      const response = await getIdAdmin();
      //console.log('Dữ liệu nhận từ API:', response);
      setIdAdmin(response);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách môn học:', error);
      setIdAdmin([]);
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
    loadIdAdmin()
  }, []);

  const handleEdit = (user) => {
    setSelectedAccount(user);
    setEditForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
      try {
        await deleteUser(id);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadUser();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa vai trò:', error);
        toast.error('Đã xảy ra lỗi khi xóa.',{ autoClose: 500 });
      }
    }
  };
  
  const handleDeleteAll = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả người dùng ?',)) {
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

  const RowStyle = [
    {
      when: row => currentUser && row.id === currentUser.id,
      style: {
        backgroundColor: '#e0f2f1',
      },
    },
  ];

  const columns = [
    {
      name: '',
      selector: row => {
        if (currentUser && row.id !== currentUser.id && row.id !== idAdmin.id) {
          return (
            <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} />
          );
        }
        return null;
      },
      sortable: false,
    },
    {
      name: 'Tên',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div >{row.name}</div>,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div style={{ }}>{row.email}</div>,
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
      selector: row => (
        <>
          {/* Hiển thị EditIcon */}
          {currentUser && currentUser.role === "Admin" &&
            (row.id !== idAdmin.id) && // Không hiển thị cho admin chính idAdmin.id
            (row.id === currentUser.id || row.id !== currentUser.id) && // Hiển thị cho admin phụ và cho tài khoản đang đăng nhập
            (
              <button className='editForm' onClick={() => handleEdit(row)}>
                <EditIcon />
              </button>
            )
          }
          {/* Hiển thị DeleteIcon */}
          {currentUser && currentUser.role === "Admin" &&
            (row.id !== idAdmin.id) && // Không hiển thị cho admin chính
            (row.id !== currentUser.id) && // Không hiển thị cho tài khoản đang đăng nhập
            (
              <button className='deleteBtn' onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </button>
            )
          }
        </>
      ),
      sortable: false,
    }
    
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
    if (selectedRows.length === 0) {
      toast.warning('Bạn phải chọn ít nhất một mục để xóa.',{ autoClose: 500 });
      return;
    }
    /* await Promise.all(selectedRows.map(async (id) => {
      await deleteUser(id);
    }));
    setSelectedRows([])
 */
    if (window.confirm('Bạn có chắc chắn muốn xóa các mục đã chọn không?',)) {
      try {
        await Promise.all(selectedRows.map(id => deleteUser(id)));
        setSelectedRows([]);
        toast.success('Xóa thành công.',{ autoClose: 500 });
        loadUser();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa vai trò:', error);
        toast.error('Đã xảy ra lỗi khi xóa!',{ autoClose: 500 });
      }
    }
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
                paginationPerPage={10}
                progressPending={loading}
                highlightOnHover
                conditionalRowStyles={RowStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
