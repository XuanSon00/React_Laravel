import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const createLession = async (lession) => {
    try {
      const response = await axios.post('http://localhost:8000/api/lessions', lession, getAuthHeaders());
      return response;
    } catch (error) {
      console.error('Lỗi khi tạo môn học:', error);
      throw error;
    }
};

const updateLession = async (id, subject) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/subjects/${id}`, subject, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật môn học:', error);
    throw error;
  }
};

const getLession = async (idSubject) => {
  try {
      const response = await axios.get(`http://localhost:8000/api/teacher/students/${idSubject}`,getAuthHeaders());
      return response;
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
  }
};
  
export {createLession, updateLession, getLession}