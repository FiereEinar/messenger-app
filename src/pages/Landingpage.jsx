import { Link } from 'react-router-dom';

export default function Landingpage() {
	return (
		<main className='min-h-screen w-screen bg-dark text-dark-500'>
			<section>
				<h1 className='text-dark-500'>Landing Page</h1>
				<h1 className='text-dark-400'>Landing Page</h1>
				<div className='flex gap-3 p-5'>
					<Link className='rounded-md bg-dark-100 p-5' to='login'>
						Login
					</Link>
					<Link className='rounded-md bg-dark-200 p-5' to='signup'>
						Signup
					</Link>
					<Link className='rounded-md bg-dark-300 p-5' to='signup'>
						Signup
					</Link>
					<Link className='rounded-md bg-dark-400 p-5' to='signup'>
						Signup
					</Link>
					<Link className='rounded-md bg-dark-500 p-5 text-black' to='signup'>
						Signup
					</Link>
				</div>
			</section>
		</main>
	);
}
