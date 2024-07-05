/* eslint-disable react/prop-types */
import { useState } from 'react';
import { InputField } from '../InputField';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateValidation } from '@/lib/validations/userSchema';
import { useToast } from '../ui/use-toast';
import { updateUser } from '@/api/user';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';

export default function ProfileEditForm({ userData }) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [profilePicture, setProfilePicture] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(userUpdateValidation),
		defaultValues: {
			firstname: userData.firstname,
			lastname: userData.lastname,
			username: userData.username,
			bio: userData.bio,
		},
	});

	const onProfileUpdateSubmit = async (data) => {
		try {
			const formData = new FormData();

			formData.append('firstname', data.firstname);
			formData.append('lastname', data.lastname);
			formData.append('username', data.username);
			formData.append('bio', data.bio);
			if (profilePicture) formData.append('profileImg', profilePicture);

			const result = await updateUser(userData._id, formData);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update user',
					description: result.message,
				});
				return;
			}

			toast({
				title: 'Profile Updated',
				description: 'Your profile has been updated successfully',
			});
			navigate(`/profile/${userData._id}`);
		} catch (err) {
			console.error('Error updating user', err);
			toast({
				variant: 'destructive',
				title: 'Network Error',
				description: 'Failed to update user',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onProfileUpdateSubmit)}
			className='p-3 overflow-auto'
		>
			{/* profile picture */}
			<div className='border-b border-dark-400 pb-3 sm:p-3'>
				{/* back button for small devices */}
				<div className='sm:hidden flex pb-2 border-b border-dark-400'>
					<BackButton />
				</div>
				{/* profile pic section */}
				<div className='flex justify-between items-center mb-3 py-3 sm:p-0'>
					<h1 className='sm:text-2xl text-lg font-semibold'>Profile Picture</h1>
					<div className='relative overflow-hidden'>
						<Button
							disabled={isSubmitting}
							type='button'
							variant='secondary'
							size='sm'
						>
							<p className='font-semibold'>Edit</p>
							<img
								className='size-4 ml-2 mb-[1px]'
								src='/icons/edit.svg'
								alt=''
							/>
						</Button>
						<input
							disabled={isSubmitting}
							onChange={(e) => setProfilePicture(e.target.files[0])}
							className='absolute border top-0 -left-[7rem] h-full opacity-0 cursor-pointer'
							type='file'
							accept='image/*'
						/>
					</div>
				</div>
				{/* profile pic preview */}
				<div className='flex justify-center'>
					<img
						className='size-[12rem] rounded-full object-cover object-center'
						src={
							profilePicture === null
								? userData.profile.url
								: URL.createObjectURL(profilePicture)
						}
						alt=''
					/>
				</div>
			</div>

			{/* other user data */}
			<div className='flex sm:p-3 pt-3 w-full gap-5 flex-wrap text-dark-500'>
				<div className='flex-1 flex flex-col gap-1'>
					<InputField
						register={{ ...register('firstname') }}
						error={errors.firstname}
						labelClass='text-lg'
						id='firstname'
						label='First name:'
						type='text'
					/>
					<InputField
						register={{ ...register('lastname') }}
						error={errors.lastname}
						labelClass='text-lg'
						id='lastname'
						label='Last name:'
						type='text'
					/>
					<InputField
						register={{ ...register('username') }}
						error={errors.username}
						labelClass='text-lg'
						id='username'
						label='Username:'
						type='text'
					/>
				</div>
				<div className='flex-1 flex flex-col text-lg'>
					<label htmlFor='bio'>Bio:</label>
					<textarea
						name='bio'
						id='bio'
						{...register('bio')}
						rows={6}
						className='bg-dark-200 rounded-md px-2 py-1 text-lg'
					/>
					{errors.bio && (
						<p className='text-red-500 text-sm'>{errors.bio.message}</p>
					)}
				</div>
			</div>

			{/* submit button */}
			<div className='mt-3 flex justify-end'>
				<Button disabled={isSubmitting} type='submit' variant='secondary'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
