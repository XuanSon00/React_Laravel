import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const getEducation = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/educations',getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching education type:', error);
    throw error;
  }
};
  
const createEducation = async (education) => {
  try {
    const response = await axios.post('http://localhost:8000/api/educations', education, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error creating education type:', error);
    throw error;
  }
};
  
const updateEducation = async (id, education) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/educations/${id}`, education, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error updating education type:', error);
    throw error;
  }
};
  
const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/educations/${id}`,getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error deleting education type:', error);
    throw error;
  }
};
  
const deleteAllEducation = async () => {
  try {
    const response = await axios.delete('http://localhost:8000/api/educations',getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error deleting all education type:', error);
    throw error;
  }
};
  
  
  
  export { getEducation, createEducation, updateEducation, deleteEducation ,deleteAllEducation}