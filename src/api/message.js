import axiosInstance from '../api/axiosInstance';

export const fetchConversation = async (senderID, receiverID) => {
  try {
    const { data } = await axiosInstance.get(`/message/${senderID}/${receiverID}`)

    return data.data;
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
};

export const postMessage = async (formData, senderID, receiverID) => {
  try {
    const { data } = await axiosInstance.post(`/message/${senderID}/${receiverID}`, formData);

    return data;
  } catch (err) {
    console.error('Error posting messages', err);
    throw err;
  }
}

export const deleteMessage = async (messageID) => {
  try {
    const { data } = await axiosInstance.delete(`/message/${messageID}`);

    return data;
  } catch (err) {
    console.error('Error deleting message', err);
    throw err;
  }
}
