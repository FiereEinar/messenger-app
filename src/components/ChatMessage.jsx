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
import { deleteMessage, fetchConversation } from '@/api/message';
import { useToast } from './ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChatMessage({ message, currentUserID, friendData }) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const { refetch } = useQuery({
		queryKey: [`messages_${currentUserID}_${friendData._id}`],
		queryFn: () => fetchConversation(currentUserID, friendData._id),
	});

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
				title: 'Message deleted successfully!',
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
		<div
			className={`flex mb-2 gap-2 w-full ${
				message.sender === currentUserID ? 'justify-end' : ''
			}`}
		>
			{message.sender !== currentUserID && (
				<Link to={`/profile/${friendData._id}`}>
					<img
						className='size-10 rounded-full'
						src={friendData.profile.url}
						alt=''
					/>
				</Link>
			)}

			<div className='flex'>
				{message.sender === currentUserID && (
					<>
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
										<DialogContent className='sm:max-w-[425px] bg-dark-300 border-none'>
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
					</>
				)}

				<div
					className={`flex flex-col gap-1 ${
						message.sender === currentUserID ? 'items-end' : ''
					}`}
				>
					{message.message && (
						<p className='w-fit bg-dark-200 py-2 px-4 rounded-3xl max-w-[22rem]'>
							{message.message}
						</p>
					)}
					{message.image && (
						<img
							className='max-w-[18rem] rounded-3xl'
							src={message.image.url}
							alt=''
						/>
					)}
				</div>
			</div>
		</div>
	);
}
