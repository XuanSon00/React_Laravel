import axios from "axios";

const getToken = () => {
    return sessionStorage.getItem('token');
  };
  
const getAuthHeaders = () => {
    return {
      headers: { Authorization: `Bearer ${getToken()}` }
    };
};
  
const createEnroll = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/api/enroll', data, getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi tạo lịch giảng dạy:', error);
        throw error;
    }  
};

const getEnroll = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/enroll', getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo lịch giảng dạy:', error);
        throw error;
    }  
};

const deleteEnroll = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/enroll/${id}`,getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi xóa lịch giảng dạy:', error);
        throw error;
    }
};

const deleteAllEnroll = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/enroll',getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error;
    }
}

const getTotalEnroll = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/totalEnroll', getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }  
};

const getListStudent = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/getListStudedntEnroll', getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }  
}

export {createEnroll,getTotalEnroll, getEnroll, deleteEnroll, deleteAllEnroll}