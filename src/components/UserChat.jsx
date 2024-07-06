import { fetchUserByID } from '@/api/user';
import ChatSection from './contents/ChatSection';
import { useQuery } from '@tanstack/react-query';
import { fetchConversation } from '@/api/message';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function UserChat() {
	const [localMessages, setLocalMessages] = useState([]);
	const { friendID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: messages,
		isLoading: messagesLoading,
		error: messagesError,
		refetch,
	} = useQuery({
		queryKey: [`messages_${currentUserID}_${friendID}`],
		queryFn: () => fetchConversation(currentUserID, friendID),
	});

	useEffect(() => {
		if (messages) {
			setLocalMessages(messages);
		}
	}, [messages]);

	console.log(localMessages);
	const {
		data: friendData,
		isLoading: friendLoading,
		error: friendError,
	} = useQuery({
		queryKey: [`user_${friendID}`],
		queryFn: () => fetchUserByID(friendID),
	});

	return (
		<ChatSection
			refetch={refetch}
			type='user'
			messages={messages}
			chatMateData={friendData}
			currentUserID={currentUserID}
			isLoading={messagesLoading || friendLoading}
			error={messagesError || friendError}
		/>
	);
}
