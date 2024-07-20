import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users',getAuthHeaders());
      return response.data; 
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
    }
};

const updateUser = async (id, user) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${id}`, user,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/users/${id}`,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const deleteAllUser = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/users',getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error;
    }
  };
//tổng số người dùng
  /* const totalUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/total-users',getAuthHeaders());
      return response.data; 
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
  }
}; */
// tổng số người dùng "Student"
/* const totalStudent = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/totalStudents',getAuthHeaders());
      return response.data; 
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
  }
}; */
// tổng số người dùng "Teacher"
/* const totalTeacher = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/totalTeachers',getAuthHeaders());
      return response.data; 
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
  }
}; */

//user đang đăng nhập
const userInfo = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/user', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};
//cập nhật user đang đăng nhập
const updateUserInfo = async () => {
  try {
    const response = await axios.put('http://localhost:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

/* const totalSubject = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/total-subjects', getAuthHeaders());
      return response.data; 
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
  }
}; */
// tổng số hóa đơn
/* const totalPriceX = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/orders',getAuthHeaders());
      return response.data; 
  } catch (error) {
      console.error('Error calling API:', error);
      throw error;
  }
}; */
//chọn ra id admin làm superadmin
const getIdAdmin = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/super-admins', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};
  
  export { getUsers, deleteUser, deleteAllUser, updateUser ,userInfo,updateUserInfo, getIdAdmin }