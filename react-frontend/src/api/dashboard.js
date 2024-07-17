import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const getDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard-data',getAuthHeaders());
      return response.data; 
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
    }
};
export { getDashboardData }