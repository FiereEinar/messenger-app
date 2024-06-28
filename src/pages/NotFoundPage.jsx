import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className='h-screen flex items-center justify-center bg-gray-100'>
			<div className='max-w-md mx-auto p-4 bg-white rounded shadow-md'>
				<h1 className='text-3xl font-bold mb-4'>404 Not Found</h1>
				<p className='text-gray-600 mb-8'>
					Sorry, the page you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link
					to='/'
					className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
				>
					Return to Home
				</Link>
			</div>
		</div>
	);
}
