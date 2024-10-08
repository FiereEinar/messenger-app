/* eslint-disable react/prop-types */
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../InputField';
import { Button } from '../ui/button';
import { userPasswordUpdateValidation } from '@/lib/validations/userSchema';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { updateUserPassword } from '@/api/user';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';

export default function ChangePasswordForm({ userID }) {
	const navigate = useNavigate();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userPasswordUpdateValidation) });

	const onSubmit = async (data) => {
		try {
			const result = await updateUserPassword(userID, data);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update user',
					description: result.message,
				});
				return;
			}

			toast({
				title: 'Password Updated',
				description:
					'You need to log in again after changing your password. Not for security but because theres a bug that the dev can not figure out',
			});
			reset();
			navigate('/logout');
		} catch (err) {
			console.error('Error updating password', err);
			toast({
				variant: 'destructive',
				title: 'Network Error',
				description: 'Failed to update password',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='p-3'>
			{/* header */}
			<div className='border-b border-dark-400 sm:p-3 pb-1'>
				<div className='flex items-center gap-2 sm:gap-0 sm:justify-between'>
					{/* back button for small devices */}
					<div className='sm:hidden flex'>
						<BackButton />
					</div>
					<h1 className='sm:text-2xl text-lg font-semibold'>Change Password</h1>
					{/* save button for desktop */}
					<div className='relative overflow-hidden sm:flex hidden'>
						<Button
							disabled={isSubmitting}
							type='submit'
							variant='secondary'
							size='sm'
						>
							<p className='font-semibold'>Save</p>
						</Button>
					</div>
				</div>
			</div>

			{/* input fields */}
			<div className='sm:p-3 pt-3 flex flex-col gap-3 text-dark-500'>
				<InputField
					register={{ ...register('oldPassword') }}
					error={errors.oldPassword}
					id='oldPassword'
					label='Enter old password:'
					type='password'
				/>
				<InputField
					register={{ ...register('newPassword') }}
					error={errors.newPassword}
					id='newPassword'
					label='Enter new password:'
					type='password'
				/>
				<InputField
					register={{ ...register('confirmNewPassword') }}
					error={errors.confirmNewPassword}
					id='confirmNewPassword'
					label='Confirm new password:'
					type='password'
				/>
				{errors.root && (
					<p className='text-red-500 text-sm'>{errors.root.message}</p>
				)}
				{/* save button for mobile */}
				<div className='w-full justify-end overflow-hidden sm:hidden flex'>
					<Button
						disabled={isSubmitting}
						type='submit'
						className='py-1 px-5'
						variant='secondary'
						size='sm'
					>
						<p className='font-semibold'>Save</p>
					</Button>
				</div>
			</div>
		</form>
	);
}
