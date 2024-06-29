import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
	return (
		<main className='w-full h-screen flex justify-center p-10 bg-dark text-dark-500'>
			<section className='flex flex-col gap-5'>
				<h1 className='text-3xl text-center font-semibold text-white'>Login</h1>
				<LoginForm />
			</section>
		</main>
	);
}
