import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const postGroup = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/group`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    })

    return data;
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
};