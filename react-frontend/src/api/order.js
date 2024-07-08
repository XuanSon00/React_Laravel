import axios from "axios";

const getToken = () => {
    return sessionStorage.getItem('token');
  };
  
  const getAuthHeaders = () => {
    return {
      headers: { Authorization: `Bearer ${getToken()}` }
    };
  };

// tổng số hóa đơn
const totalPriceX = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/orders',getAuthHeaders());
        return response.data; 
    } catch (error) {
        console.error('Error calling API:', error);
        throw error;
    }
  };
  
  
  const getOrderHistory = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/orders/history', getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

const getRecipt = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/order/recipt', getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};


const getOrderUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/ordersUser', getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

  

export {totalPriceX, getOrderHistory,getRecipt, getOrderUser }