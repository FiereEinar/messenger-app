/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatFeed({
	messages,
	currentUserID,
	friendData,
	type,
}) {
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<main className='flex-grow overflow-auto border-b border-dark-200 p-3 flex flex-col'>
			{messages.map((message) => (
				<ChatMessage
					type={type}
					key={message._id}
					message={message}
					currentUserID={currentUserID}
					friendData={friendData}
				/>
			))}
			<div ref={bottomRef} />
		</main>
	);
}
