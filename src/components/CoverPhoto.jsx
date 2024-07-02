import { useState } from 'react';
import { useToast } from './ui/use-toast';
import { updateUserCoverPhoto } from '@/api/user';

/* eslint-disable react/prop-types */
export default function CoverPhoto({ imageURL, userID, refetch }) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const onCoverPhotoChangeHandler = async (e) => {
		try {
			e.preventDefault();
			setIsLoading(true);

			const formData = new FormData();
			formData.append('coverPhoto', e.target.files[0]);

			const result = await updateUserCoverPhoto(userID, formData);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update cover photo',
					description: result.message,
				});
				return;
			}

			toast({
				title: 'Cover Photo Updated',
				description: 'Your cover photo has been updated successfully',
			});
			refetch();
		} catch (err) {
			console.error('Error updating cover photo', err);
			toast({
				variant: 'destructive',
				title: 'Network Error',
				description: 'Failed to update cover photo',
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='relative'>
			<img
				className='w-full h-[16rem] object-cover object-center rounded-md'
				src={imageURL}
				alt='Cover Photo'
			/>
			{currentUserID === userID && (
				<div className='absolute right-2 cursor-pointer bottom-2 p-2 rounded-full bg-dark-300 size-fit'>
					<label className={isLoading ? 'opacity-70' : ''} htmlFor='coverPhoto'>
						<img
							className='size-5 cursor-pointer'
							src='/icons/camera.svg'
							alt=''
						/>
					</label>
					<input
						disabled={isLoading}
						onChange={onCoverPhotoChangeHandler}
						id='coverPhoto'
						hidden
						type='file'
						accept='image/*'
					/>
				</div>
			)}
		</div>
	);
}
