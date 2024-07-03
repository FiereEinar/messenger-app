import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidation } from '@/lib/validations/authSchema';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultButtonLoadingSpin } from '../LoadingScreens';

export default function LoginForm() {
	const BASE_API_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const { toast } = useToast();

	const {
		register,
		setError,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(loginValidation),
	});

	const loginHandler = async (data) => {
		try {
			const { data: result } = await axios.post(
				`${BASE_API_URL}/auth/login`,
				data
			);

			if (!result.success) {
				setError('root', { message: result.message });
				toast({
					variant: 'destructive',
					title: 'Failed to login',
					description: result.message,
				});
				return;
			}

			localStorage.setItem('Token', `Bearer ${result.data.token}`);
			localStorage.setItem('UserID', result.data.userID);

			toast({
				title: 'Log in successfull!',
			});
			navigate('/chats');
		} catch (err) {
			console.error('Error loggin in', err);
			toast({
				variant: 'destructive',
				title: 'Failed to login',
			});
		}
	};

	return (
		<form
			className='bg-dark-100 rounded-md shadow-md p-5 flex flex-col gap-3'
			onSubmit={handleSubmit(loginHandler)}
		>
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
			<p className='text-xs'>
				Don&apos;t have an account?{' '}
				<Link className='underline' to='/signup'>
					Sign up
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
