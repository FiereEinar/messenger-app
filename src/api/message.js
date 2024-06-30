import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const fetchConversation = async (senderID, receiverID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/message/${senderID}/${receiverID}`)

    return data.data;
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
};

export const postMessage = async (formData, senderID, receiverID) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/message/${senderID}/${receiverID}`, formData);

    return data;
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
}