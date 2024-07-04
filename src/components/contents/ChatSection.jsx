/* eslint-disable react/prop-types */
import SendMessageForm from '../forms/SendMessageForm';
import ChatFeed from '../ChatFeed';
import MainContentHeader, { MainContentContainer } from '../MainContent';
import { ChatContentLoadingScreen } from '../LoadingScreens';

/**
 *
 * @param {'user' | 'group'} type either a user or group message
 */
export default function ChatSection({
	messages,
	chatMateData,
	currentUserID,
	isLoading,
	error,
	type,
}) {
	return (
		<MainContentContainer>
			{isLoading && <ChatContentLoadingScreen />}
			{error && (
				<h1 className='text-5xl font-bold text-dark-500'>An error occured</h1>
			)}
			{chatMateData && messages && (
				<>
					<MainContentHeader
						type={type}
						profile={chatMateData.profile.url}
						firstname={chatMateData.firstname || chatMateData.name}
						lastname={chatMateData.lastname || ''}
						userID={chatMateData._id}
					/>

					<ChatFeed
						type={type}
						messages={messages}
						currentUserID={currentUserID}
						friendData={chatMateData}
					/>

					<SendMessageForm type={type} />
				</>
			)}
		</MainContentContainer>
	);
}
