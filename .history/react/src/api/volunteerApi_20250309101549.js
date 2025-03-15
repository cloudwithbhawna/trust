import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/volunteers";

const volunteerApi = {
  createVolunteer: async (volunteerData) => {
    const response = await axios.post(`${API_URL}`, volunteerData);
    return response.data;
  },

  getAllVolunteers: async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  getVolunteerById: async (volunteerId) => {
    const response = await axios.get(`${API_URL}/${volunteerId}`);
    return response.data;
  },

  updateVolunteer: async (volunteerId, volunteerData) => {
    const response = await axios.put(`${API_URL}/${volunteerId}`, volunteerData);
    return response.data;
  },

  deleteVolunteer: async (volunteerId) => {
    const response = await axios.delete(`${API_URL}/${volunteerId}`);
    return response.data;
  },
};

export default volunteerApi;
