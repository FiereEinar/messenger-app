import SearchUsersFeed from '@/components/SearchUsersFeed';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarAndMainContainer,
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
		<SecondarySidebarAndMainContainer>
			{/* SECONDARY SIDEBAR */}
			{/* hidden on mobile */}
			<div className={`sm:flex sm:w-fit w-full ${groupID ? 'hidden' : ''}`}>
				<SecondarySidebarAside>
					<SecondarySidebarAsideHeader>
						<SecondarySidebarAsideHeaderText>
							Global Chat
						</SecondarySidebarAsideHeaderText>
					</SecondarySidebarAsideHeader>
					{/* SIDEBAR CONTENT */}
					<SearchUsersFeed />
				</SecondarySidebarAside>
			</div>

			{/* MAIN CONTENT */}
			<div className={`flex w-full`}>
				<ChatSection
					type='group'
					showBackBtn={false}
					messages={messages}
					chatMateData={groupData}
					currentUserID={currentUserID}
					isLoading={messagesLoading || groupLoading}
					error={messagesError || groupError}
				/>
			</div>
		</SecondarySidebarAndMainContainer>
	);
}
