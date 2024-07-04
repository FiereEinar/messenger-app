import SearchUsersFeed from '@/components/SearchUsersFeed';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarContainer,
} from '@/components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import ChatSection from '@/components/contents/ChatSection';
import { fetchGroupByID, fetchGroupConversation } from '@/api/group';
import { useParams } from 'react-router-dom';

export default function Global() {
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
		<SecondarySidebarContainer>
			{/* SECONDARY SIDEBAR */}
			<SecondarySidebarAside>
				<SecondarySidebarAsideHeader>
					<SecondarySidebarAsideHeaderText>
						Global Chat
					</SecondarySidebarAsideHeaderText>
				</SecondarySidebarAsideHeader>
				{/* SIDEBAR CONTENT */}
				{/* all users */}
				<SearchUsersFeed />
			</SecondarySidebarAside>

			{/* MAIN CONTENT */}
			<ChatSection
				type='group'
				messages={messages}
				chatMateData={groupData}
				currentUserID={currentUserID}
				isLoading={messagesLoading || groupLoading}
				error={messagesError || groupError}
			/>
		</SecondarySidebarContainer>
	);
}
