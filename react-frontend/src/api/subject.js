import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const getSubjects = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/subjects',);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};
  
const createSubject = async (subject) => {
  try {
    const response = await axios.post('http://localhost:8000/api/subjects', subject, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo môn học:', error);
    throw error;
  }
};
  
const updateSubject = async (id, subject) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/subjects/${id}`, subject, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật môn học:', error);
    throw error;
  }
};


const deleteSubject = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/subjects/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa môn học:', error);
    throw error;
  }
};

const deleteAllSubjects = async () => {
  try {
    const response = await axios.delete('http://localhost:8000/api/subjects', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa tất cả môn học:', error);
    throw error;
  }
};

const totalSubject = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/total-subjects', getAuthHeaders());
      return response.data; 
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
  }
};

const searchSubject = async (search) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/search-subjects?query=${search}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

  
export { getSubjects, createSubject, updateSubject, deleteSubject ,deleteAllSubjects, totalSubject, searchSubject }