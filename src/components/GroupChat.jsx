import { useParams } from 'react-router-dom';
import ChatSection from './contents/ChatSection';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupByID, fetchGroupConversation } from '@/api/group';

export default function GroupChat() {
	const { groupID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: messages,
		isLoading: messagesLoading,
		error: messagesError,
	} = useQuery({
		queryKey: [`messages_${groupID}`],
		queryFn: () => fetchGroupConversation(groupID),
	});

	const {
		data: groupData,
		isLoading: groupLoading,
		error: groupError,
	} = useQuery({
		queryKey: [`group_${groupID}`],
		queryFn: () => fetchGroupByID(groupID),
	});

	return (
		<ChatSection
			type='group'
			messages={messages}
			chatMateData={groupData}
			currentUserID={currentUserID}
			isLoading={messagesLoading || groupLoading}
			error={messagesError || groupError}
		/>
	);
}
