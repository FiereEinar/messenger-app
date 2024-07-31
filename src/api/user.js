import axiosInstance from '../api/axiosInstance';

export const fetchUserByID = async (userID) => {
  try {
    const { data } = await axiosInstance.get(`/user/${userID}`);

    return data.data;
  } catch (err) {
    console.error('Error fetching user', err);
    throw err;
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/user`);

    return data.data;
  } catch (err) {
    console.error('Error fetching users', err);
    throw err;
  }
};

export const updateUser = async (userID, formData) => {
  try {
    const { data } = await axiosInstance.put(`/user/${userID}`, formData);

    return data;
  } catch (err) {
    console.error('Error updating user', err);
    throw err;
  }
};

export const updateUserCoverPhoto = async (userID, formData) => {
  try {
    const { data } = await axiosInstance.put(`/user/${userID}/cover`, formData);

    return data;
  } catch (err) {
    console.error('Error updating cover photo', err);
    throw err;
  }
};

export const updateUserPassword = async (userID, formData) => {
  try {
    const { data } = await axiosInstance.put(`/user/${userID}/password`, formData);

    return data;
  } catch (err) {
    console.error('Error updating password', err);
    throw err;
  }
};

export const fetchUserGroups = async (userID) => {
  try {
    const { data } = await axiosInstance.get(`/group/${userID}`);

    return data.data;
  } catch (err) {
    console.error('Error updating password', err);
    throw err;
  }
};

export const updateUserStatus = async (userID, formData) => {
  try {
    const { data } = await axiosInstance.put(`/user/${userID}/status`, formData);

    return data;
  } catch (err) {
    console.error('Error updating user status', err);
    throw err;
  }
}