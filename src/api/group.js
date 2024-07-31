import axiosInstance from '../api/axiosInstance';

export const postGroup = async (formData) => {
  try {
    const { data } = await axiosInstance.post(`/group`, formData)

    return data;
  } catch (err) {
    console.error('Error creating group', err);
    throw err;
  }
};

export const fetchGroupConversation = async (groupID) => {
  try {
    const { data } = await axiosInstance.get(`/group/${groupID}/chats`)

    return data.data;
  } catch (err) {
    console.error('Error fetching group messages', err);
    throw err;
  }
};

export const fetchGroupByID = async (groupID) => {
  try {
    const { data } = await axiosInstance.get(`/group/${groupID}/info`)

    return data.data;
  } catch (err) {
    console.error('Error fetching group data', err);
    throw err;
  }
};

export const postGroupMessage = async (formData, senderID, groupID) => {
  try {
    const { data } = await axiosInstance.post(`/group/chats/${senderID}/${groupID}`, formData);

    return data;
  } catch (err) {
    console.error('Error posting group message', err);
    throw err;
  }
}
