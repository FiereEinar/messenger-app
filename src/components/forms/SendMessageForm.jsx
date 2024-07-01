import { fetchConversation, postMessage } from '@/api/message';
import { messageValidation } from '@/lib/validations/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SendMessageForm() {
	const { toast } = useToast();
	const { friendID } = useParams();
	const currentUserID = localStorage.getItem('UserID');
	const [image, setImage] = useState(null);

	const { refetch } = useQuery({
		queryKey: [`messages_${currentUserID}_${friendID}`],
		queryFn: () => fetchConversation(currentUserID, friendID),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(messageValidation),
	});

	const onMessageSubmit = async (data) => {
		try {
			const formData = new FormData();

			formData.append('message', data.message);
			if (image) formData.append('image', image);

			const result = await postMessage(formData, currentUserID, friendID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'An error occured',
					description: result.error,
				});
				return;
			}

			refetch();
			reset();
		} catch (err) {
			console.error('Error sending message', err);
			toast({
				variant: 'destructive',
				title: 'An error occured',
				description: 'Error sending message',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onMessageSubmit)} className='p-2 flex gap-2'>
			<input
				{...register('message')}
				className='bg-transparent flex-1 border border-dark-300 rounded-3xl px-4'
				type='text'
			/>
			<div className='flex gap-2'>
				<div className='relative cursor-pointer'>
					<input
						accept='image/*'
						onChange={(e) => setImage(e.target.files[0])}
						disabled={isSubmitting}
						className='size-12 z-50 opacity-0 cursor-pointer border absolute'
						type='file'
					/>
					<button
						disabled={isSubmitting}
						type='button'
						className=' p-2 disabled:opacity-80 grid place-items-center border border-dark-300 rounded-full'
					>
						<img className='size-8' src='/icons/image.svg' alt='' />
					</button>
				</div>
				<button
					disabled={isSubmitting}
					type='submit'
					className='p-2 disabled:opacity-80 grid place-items-center border border-dark-300 rounded-full'
				>
					<img className='size-8' src='/icons/send.svg' alt='' />
				</button>
			</div>
		</form>
	);
}
