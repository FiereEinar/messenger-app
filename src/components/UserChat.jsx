import { fetchUserByID } from '@/api/user';
import ChatSection from './contents/ChatSection';
import { useQuery } from '@tanstack/react-query';
import { fetchConversation } from '@/api/message';
import { useParams } from 'react-router-dom';

export default function UserChat() {
	const { friendID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: messages,
		isLoading: messagesLoading,
		error: messagesError,
	} = useQuery({
		queryKey: [`messages_${currentUserID}_${friendID}`],
		queryFn: () => fetchConversation(currentUserID, friendID),
	});

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
			type='user'
			messages={messages}
			chatMateData={friendData}
			currentUserID={currentUserID}
			isLoading={messagesLoading || friendLoading}
			error={messagesError || friendError}
		/>
	);
}
