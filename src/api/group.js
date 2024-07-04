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
    console.error('Error creating group', err);
    throw err;
  }
};

export const fetchGroupConversation = async (groupID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/group/${groupID}/chats`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    })

    return data.data;
  } catch (err) {
    console.error('Error fetching group messages', err);
    throw err;
  }
};

export const fetchGroupByID = async (groupID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/group/${groupID}/info`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    })

    return data.data;
  } catch (err) {
    console.error('Error fetching group data', err);
    throw err;
  }
};

export const postGroupMessage = async (formData, senderID, groupID) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/group/chats/${senderID}/${groupID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (err) {
    console.error('Error posting group message', err);
    throw err;
  }
}
