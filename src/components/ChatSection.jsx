import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchConversation } from '@/api/message';
import { fetchUserByID } from '@/api/user';
import SendMessageForm from './forms/SendMessageForm';
import { useEffect } from 'react';
import ChatFeed from './ChatFeed';
import MainContentHeader, { MainContentContainer } from './MainContent';

export default function ChatSection() {
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

	useEffect(() => {
		window.scrollTo(1000, 0);
	}, []);

	return (
		<MainContentContainer>
			{messagesLoading && friendLoading && (
				<h1 className='text-5xl font-bold text-dark-500 p-3'>Loading...</h1>
			)}
			{messagesError && friendError && (
				<h1 className='text-5xl font-bold text-dark-500'>An error occured</h1>
			)}
			{friendData && messages && (
				<>
					<MainContentHeader
						profile={friendData.profile.url}
						firstname={friendData.firstname}
						lastname={friendData.lastname}
						userID={friendData._id}
					/>

					<ChatFeed
						messages={messages}
						currentUserID={currentUserID}
						friendData={friendData}
					/>

					<SendMessageForm />
				</>
			)}
		</MainContentContainer>
	);
}
