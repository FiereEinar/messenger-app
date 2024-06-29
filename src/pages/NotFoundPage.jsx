import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className='h-screen flex items-center justify-center bg-dark'>
			<div className='max-w-md mx-auto p-4 bg-dark-100 rounded shadow-2xl'>
				<h1 className='text-3xl font-bold mb-4 text-white'>404 Not Found</h1>
				<p className='text-dark-500 mb-8'>
					Sorry, the page you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link to='/'>
					<Button variant='secondary' className='font-bold py-2 px-4'>
						Return to Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
