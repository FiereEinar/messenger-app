/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

export default function ChatFeed({ messages, currentUserID, friendData }) {
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<main className='flex-grow overflow-auto border-b border-dark-200 p-3 flex flex-col'>
			{messages.map((message) => (
				<div
					key={message._id}
					className={`flex mb-2 gap-2 ${
						message.sender === currentUserID ? 'self-end' : ''
					}`}
				>
					{message.sender !== currentUserID && (
						<img
							className='size-10 rounded-full'
							src={friendData.profile.url}
							alt=''
						/>
					)}
					<div className='w-fit bg-dark-200 py-2 px-4 rounded-3xl max-w-[22rem]'>
						<p>{message.message}</p>
					</div>
				</div>
			))}
			<div ref={bottomRef} />
		</main>
	);
}
