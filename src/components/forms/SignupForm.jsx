import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../InputField';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { DefaultButtonLoadingSpin } from '../LoadingScreens';
import { signupSchema } from '@/lib/validations/authSchema';
import axios from 'axios';

export default function SignupForm() {
	const BASE_API_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const { toast } = useToast();

	const {
		register,
		setError,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const signupHandler = async (formData) => {
		try {
			const { data: result } = await axios.post(
				`${BASE_API_URL}/auth/signup`,
				formData
			);

			if (!result.success) {
				setError('root', { message: result.message });
				toast({
					variant: 'destructive',
					title: 'Failed to signup',
					description: result.message,
				});
				return;
			}

			toast({
				title: 'Sign up successfull!',
				description: 'Log in with your account to proceed',
			});
			navigate('/login');
		} catch (err) {
			console.error('Error signing up', err);
			toast({
				variant: 'destructive',
				title: 'Failed to signup',
			});
		}
	};

	return (
		<form
			className='flex flex-col gap-3'
			onSubmit={handleSubmit(signupHandler)}
		>
			<div className='flex md:flex-nowrap flex-wrap gap-3'>
				<InputField
					register={{ ...register('firstname') }}
					error={errors.firstname}
					label='First name: '
					id='firstname'
					type='text'
				/>
				<InputField
					register={{ ...register('lastname') }}
					error={errors.lastname}
					label='Last name: '
					id='lastname'
					type='text'
				/>
			</div>
			<InputField
				register={{ ...register('username') }}
				error={errors.username}
				label='Username: '
				id='username'
				type='text'
			/>
			<InputField
				register={{ ...register('password') }}
				error={errors.password}
				label='Password: '
				id='password'
				type='password'
			/>
			<InputField
				register={{ ...register('confirmPassword') }}
				error={errors.confirmPassword}
				label='Confirm Password: '
				id='confirmPassword'
				type='password'
			/>
			<p className='text-xs'>
				Already have have an account?{' '}
				<Link className='underline' to='/login'>
					Log in
				</Link>{' '}
			</p>
			{errors.root && (
				<p className='text-red-500 text-sm'>{errors.root.message}</p>
			)}
			<div className='flex justify-end'>
				<Button
					disabled={isSubmitting}
					variant='secondary'
					type='submit'
					size='sm'
				>
					{isSubmitting ? <DefaultButtonLoadingSpin /> : 'Submit'}
				</Button>
			</div>
		</form>
	);
}
