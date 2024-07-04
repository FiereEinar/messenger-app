import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const fetchConversation = async (senderID, receiverID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/message/${senderID}/${receiverID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    })

    return data.data;
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
};

export const postMessage = async (formData, senderID, receiverID) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/message/${senderID}/${receiverID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error posting messages', err);
    throw err;
  }
}

export const deleteMessage = async (messageID) => {
  try {
    const { data } = await axios.delete(`${BASE_API_URL}/message/${messageID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error deleting message', err);
    throw err;
  }
}
