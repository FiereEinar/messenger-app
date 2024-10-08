import SignupForm from '@/components/forms/SignupForm';
import { HeaderLogo, RoundedLogo } from '@/components/ui/logo';
import SlandtedSheet from '@/components/ui/slantedSheet';
import Socials from '@/components/ui/socials';
import Stripes from '@/components/ui/stripes';

export default function SignupPage() {
	return (
		<main className='relative overflow-hidden w-full h-[100dvh] flex justify-center p-16 bg-dark text-dark-500'>
			<div className='z-50 flex justify-center items-center md:gap-16'>
				{/* sign up form */}
				<section className='flex'>
					<div className='relative md:w-[34rem] w-[20rem] p-10 flex flex-col gap-5 h-fit'>
						<HeaderLogo />
						<h1 className='text-3xl font-bold text-white'>Sign up</h1>
						<SignupForm />
					</div>
				</section>
				<RoundedLogo />
			</div>

			{/* DESIGNS */}
			<SlandtedSheet />
			<Stripes />
			<Socials />
		</main>
	);
}
