import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getAuthHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
};

const getRoles = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/roles',getAuthHeaders());
      return response.data;
  } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
  }
};

const createRole = async (role) => {
  try {
      const response = await axios.post('http://localhost:8000/api/roles', role, getAuthHeaders());
      return response.data;
  } catch (error) {
      console.error('Error creating role:', error);
      throw error;
  }
};

const updateRole = async (id, role) => {
  try {
      const response = await axios.put(`http://localhost:8000/api/roles/${id}`, role, getAuthHeaders());
      return response.data;
  } catch (error) {
      console.error('Error updating role:', error);
      throw error;
  }
};

const deleteRole = async (id) => {
  try {
      const response = await axios.delete(`http://localhost:8000/api/roles/${id}`,getAuthHeaders());
      return response.data;
  } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
  }
};

const deleteAllRoles = async () => {
  try {
      const response = await axios.delete('http://localhost:8000/api/roles',getAuthHeaders());
      return response.data;
  } catch (error) {
      console.error('Error deleting all roles:', error);
      throw error;
  }
};



export { getRoles, createRole, updateRole, deleteRole ,deleteAllRoles}