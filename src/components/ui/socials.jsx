import { Link } from 'react-router-dom';

export default function Socials() {
	return (
		<div className='absolute flex gap-5 bottom-[-3.3rem] transition-all duration-500 rounded-t-md hover:bottom-0 left-[50%] transform -translate-x-1/2 py-3 px-8 bg-dark-200'>
			<Link to='https://github.com/FiereEinar' target='_blank'>
				<img className='size-10 rounded-full' src='/github.png' alt='' />
			</Link>
			<Link
				to='https://www.linkedin.com/in/nick-xylan-melloria-91671228b/'
				target='_blank'
			>
				<img className='size-10 rounded-full' src='/linkedin.png' alt='' />
			</Link>
		</div>
	);
}
