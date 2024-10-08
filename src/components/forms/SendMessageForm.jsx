/* eslint-disable react/prop-types */
import { postMessage } from '@/api/message';
import { messageValidation } from '@/lib/validations/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { postGroupMessage } from '@/api/group';

/**
 *
 * @param {'user' | 'group'} type either a user or group message
 */
export default function SendMessageForm({ type, refetch }) {
	const { toast } = useToast();
	const { friendID, groupID } = useParams();
	const currentUserID = localStorage.getItem('UserID');
	const [image, setImage] = useState(null);

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
			if (data.message.length === 0 && !image) return;

			const formData = new FormData();

			formData.append('message', data.message);
			if (image) formData.append('image', image);

			let result = null;

			if (type === 'user')
				result = await postMessage(formData, currentUserID, friendID);
			if (type === 'group')
				result = await postGroupMessage(formData, currentUserID, groupID);

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
			setImage(null);
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
		<div>
			{/* image preview */}
			{image && (
				<div
					className={`relative p-3 w-fit h-fit ${
						isSubmitting ? 'opacity-70' : ''
					}`}
				>
					<img
						className='w-[15rem] rounded-md'
						src={URL.createObjectURL(image)}
						alt='image preview'
					/>
					{/* remove image button */}
					<button
						disabled={isSubmitting}
						onClick={() => setImage(null)}
						className='absolute size-6 top-0 right-0 bg-dark-300 rounded-full p-1'
					>
						<img className='' src='/icons/close.svg' alt='' />
					</button>
				</div>
			)}

			<form onSubmit={handleSubmit(onMessageSubmit)} className='p-2 flex gap-2'>
				{/* message */}
				<textarea
					{...register('message')}
					disabled={isSubmitting || !currentUserID}
					style={{ resize: 'none' }}
					placeholder={!currentUserID ? 'Login to send message' : ''}
					className='bg-transparent flex-1 w-full py-2 border border-dark-300 rounded-3xl px-4 flex-shrink'
					rows={1}
				/>
				{/* image and send button */}
				<div className='flex gap-2'>
					{/* send image button */}
					<div className='relative cursor-pointer flex-shrink-0'>
						{/* custom label for image input */}
						<label
							htmlFor='image'
							disabled={isSubmitting || !currentUserID}
							type='button'
							className='cursor-pointer sm:p-2 p-[6px] disabled:opacity-70 grid place-items-center border border-dark-300 rounded-full'
						>
							<img className='sm:size-8 size-5' src='/icons/image.svg' alt='' />
						</label>
						{/* hidden input */}
						<input
							accept='image/*'
							onChange={(e) => setImage(e.target.files[0])}
							disabled={isSubmitting || !currentUserID}
							className='size-12 z-40 cursor-pointer border absolute'
							type='file'
							id='image'
							hidden
						/>
					</div>
					{/* send button */}
					<button
						disabled={isSubmitting || !currentUserID}
						type='submit'
						className='sm:p-2 h-fit p-[6px] disabled:opacity-70 grid place-items-center border border-dark-300 rounded-full flex-shrink-0'
					>
						<img className='sm:size-8 size-5' src='/icons/send.svg' alt='' />
					</button>
				</div>
			</form>
		</div>
	);
}
