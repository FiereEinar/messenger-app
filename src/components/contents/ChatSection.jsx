/* eslint-disable react/prop-types */
import SendMessageForm from '../forms/SendMessageForm';
import ChatFeed from '../ChatFeed';
import MainContentHeader, { MainContentContainer } from '../MainContent';

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
			{isLoading && (
				<h1 className='text-5xl font-bold text-dark-500 p-3'>Loading...</h1>
			)}
			{error && (
				<h1 className='text-5xl font-bold text-dark-500'>An error occured</h1>
			)}
			{chatMateData && messages && (
				<>
					<MainContentHeader
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
