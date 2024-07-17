import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const getSubjects = async (page = 1 ,limit = 10) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/subjects?page=${page}&limit=${limit}`,);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

const getSubject = async (page = 1 ,limit = 10) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/subject`,getAuthHeaders());
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

const detailSubject = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/subjects/${id}`,);
    return response;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};





  
export { getSubjects, getSubject , createSubject, updateSubject, deleteSubject ,deleteAllSubjects, detailSubject}