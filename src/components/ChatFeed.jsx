/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { format } from 'date-fns';

export default function ChatFeed({
	messages,
	currentUserID,
	friendData,
	refetch,
	type,
}) {
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<main className='flex-grow overflow-auto border-b border-dark-200 p-3 flex flex-col'>
			{messages.length === 0 && (
				<p className='m-auto text-dark-500 italic'>
					Start a conversation, say Hi!
				</p>
			)}

			{messages.map((message, currentIndex, arr) => (
				<div className='flex justify-center flex-col' key={message._id}>
					{message.dateSent.split('T')[0] !==
						arr[currentIndex - 1]?.dateSent.split('T')[0] && (
						<p className='text-xs text-dark-500 m-auto my-5'>
							{format(message.dateSent, 'MM/dd/yyyy')}
						</p>
					)}
					<ChatMessage
						refetch={refetch}
						type={type}
						message={message}
						currentUserID={currentUserID}
						friendData={friendData}
					/>
				</div>
			))}
			<div ref={bottomRef} />
		</main>
	);
}
