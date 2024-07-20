import axios from "axios";

const getToken = () => {
    return sessionStorage.getItem('token');
  };
  
  const getAuthHeaders = () => {
    return {
      headers: { Authorization: `Bearer ${getToken()}` }
    };
  };
  

const getTeachers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/getTeachers',getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

const getSubject = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/subject',getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

const getSchedule = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/schedules',getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

const classOnline = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/classOnline',getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}


const createDate = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/api/schedules', data, getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi tạo lịch giảng dạy:', error);
        throw error;
    }
};

const updateDate = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/schedules/${id}`, data,getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi cập nhật giảng dạy:', error);
        throw error;
    }
};

const deleteDate = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/schedules/${id}`,getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi xóa lịch giảng dạy:', error);
        throw error;
    }
};

const deleteAllDate = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/schedules',getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error;
    }
}

const getScheduleTeacher = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/getScheduleTeacher`,getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

const getStudentsBySchedule = async (idSchedule) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/teacher/students/${idSchedule}`,getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

const getScheduleStudent = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/schedule/students',getAuthHeaders());
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

export { getTeachers, getSchedule,classOnline,getSubject, createDate, deleteDate,updateDate, deleteAllDate, getScheduleTeacher,getStudentsBySchedule,getScheduleStudent };