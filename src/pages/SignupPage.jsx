import SignupForm from '@/components/forms/SignupForm';

export default function SignupPage() {
	return (
		<main className='w-full h-screen flex justify-center p-16 bg-dark text-dark-500'>
			<section className='flex'>
				<div className='bg-dark-100 md:w-[34rem] w-[22rem] shadow-2xl p-10 flex flex-col gap-3 h-fit rounded-[1rem]'>
					<h1 className='text-3xl text-center font-semibold text-white'>
						Sign up
					</h1>
					<SignupForm />
				</div>
			</section>
		</main>
	);
}
