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

export const updateUserCoverPhoto = async (userID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}/cover`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating cover photo', err);
    throw err;
  }
};

export const updateUserPassword = async (userID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}/password`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating password', err);
    throw err;
  }
};

export const fetchUserGroups = async (userID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/group/${userID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (err) {
    console.error('Error updating password', err);
    throw err;
  }
};

export const updateUserStatus = async (userID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}/status`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating password', err);
    throw err;
  }
}