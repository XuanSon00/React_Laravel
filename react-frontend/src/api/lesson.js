import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const createLesson = async (lesson) => {
    try {
      const response = await axios.post('http://localhost:8000/api/lessons', lesson, getAuthHeaders());
      return response;
    } catch (error) {
      console.error('Lỗi khi tạo bài học:', error);
      throw error;
    }
};

const updateLesson = async (id, lesson) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/lessons/${id}`, lesson, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật bài học:', error);
    throw error;
  }
};

const getLesson = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/lessons',getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

const deleteLesson = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/lessons/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa bài học:', error);
    throw error;
  }
};

const deleteAllLessons = async () => {
  try {
    const response = await axios.delete('http://localhost:8000/api/lessons', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa tất cả bài học:', error);
    throw error;
  }
};

const lessonOnline = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/online/subjects/${id}`,getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

  
export {createLesson, updateLesson, getLesson, deleteAllLessons, deleteLesson, lessonOnline}