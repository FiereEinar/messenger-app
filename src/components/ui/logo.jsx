export function RoundedLogo() {
	return (
		<section>
			<img
				className='rounded-full shadow-2xl hidden lg:flex'
				src='/logo.jpg'
				alt='logo'
			/>
		</section>
	);
}

export function HeaderLogo() {
	return (
		<div className='absolute -top-12 flex items-center gap-2'>
			<img className='size-10 rounded-md' src='/logo.jpg' alt='' />
			<h1 className='text-white text-lg font-semibold'>Hidden Hub</h1>
		</div>
	);
}
