import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const fetchUserByID = async (userID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user/${userID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (err) {
    console.error('Error fetching user', err);
    throw err;
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (err) {
    console.error('Error fetching users', err);
    throw err;
  }
};

export const updateUser = async (userID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating user', err);
    throw err;
  }
};
