/* eslint-disable react/prop-types */
import {
	Menubar,
	MenubarContent,
	// MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { deleteMessage } from '@/api/message';
import { useToast } from './ui/use-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChatMessage({
	message,
	currentUserID,
	friendData,
	refetch,
	type,
}) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	// we get the sender id based on type
	// because if its a group, we need to get the sender data from the message itself not the friendData
	const senderID = type === 'user' ? message.sender : message.sender._id;

	const deleteMessageHandler = async (messageID) => {
		try {
			setIsLoading(true);
			const result = await deleteMessage(messageID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to delete message',
					description: result.message,
				});
				return;
			}

			refetch();
			toast({
				title: 'Message deleted',
			});
		} catch (err) {
			console.error('Error deleting message', err);
			toast({
				variant: 'destructive',
				title: 'Failed to delete message',
				description: 'An error occured while trying to delete the message',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		// align the message based on who's the sender
		<div
			className={`flex mb-2 gap-2 w-full ${
				senderID === currentUserID ? 'justify-end pl-6' : 'pr-6'
			}`}
		>
			{/* if it's not the user's message, we need to put the image of the sender */}
			{senderID !== currentUserID && (
				<div className='mt-auto !size-8 sm:!size-10 flex-shrink-0'>
					<Link to={`/profile/${type === 'user' ? friendData._id : senderID}`}>
						<img
							className='!size-8 sm:!size-10 rounded-full'
							src={
								type === 'user'
									? friendData.profile.url
									: message.sender.profile.url
							}
							alt=''
						/>
					</Link>
				</div>
			)}

			<div
				className={`relative flex ${
					senderID !== currentUserID && type !== 'user' ? 'mt-5' : ''
				}`}
			>
				{/* only show username if its a group message */}
				{senderID !== currentUserID && type !== 'user' && (
					<p className='absolute text-xs -top-5 left-3 text-dark-500'>
						@{friendData.username || message.sender.username}
					</p>
				)}
				{/* delete button for a message */}
				{senderID === currentUserID && (
					<Menubar className='w-fit'>
						<MenubarMenu>
							<MenubarTrigger>
								<img className='size-6' src='/icons/3_dots.svg' alt='' />
							</MenubarTrigger>
							<MenubarContent className='text-white'>
								<Dialog>
									<DialogTrigger asChild>
										<button className='px-2 py-1.5'>Delete</button>
									</DialogTrigger>
									<DialogContent className='sm:max-w-[425px] w-[90%] bg-dark-300 border-none rounded-md'>
										<DialogHeader>
											<DialogTitle className='text-white'>
												Delete message
											</DialogTitle>
											<DialogDescription className='text-dark-500'>
												Are you sure you want to delete this message?
											</DialogDescription>
										</DialogHeader>
										<div className='grid gap-4 py-4'></div>
										<DialogFooter>
											<Button
												disabled={isLoading}
												onClick={() => deleteMessageHandler(message._id)}
												variant='destructive'
												type='submit'
											>
												Confirm
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				)}

				<div className='flex'>
					<div
						className={`flex flex-col gap-1 ${
							senderID === currentUserID ? 'items-end' : ''
						}`}
					>
						{message.message && (
							<p
								style={{ whiteSpace: 'pre-wrap' }}
								className='bg-dark-200 py-2 px-4 rounded-2xl flex-shrink w-fit max-w-[22rem] text-wrap'
							>
								{message.message}
							</p>
						)}
						{message.image?.url && (
							<img
								className='max-w-[18rem] w-[90%] rounded-2xl flex-shrink'
								src={message.image.url}
								alt=''
							/>
						)}
						{/* <p className='text-xs ml-3 text-dark-500'>
							at {format(message.dateSent, 'h aaa')}
						</p> */}
					</div>
				</div>
			</div>
		</div>
	);
}
