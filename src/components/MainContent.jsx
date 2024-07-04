/* eslint-disable react/prop-types */
import _ from 'lodash';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

export function MainContentContainer({ children }) {
	return (
		<section className='md:h-[96.5vh] sm:h-[99vh] h-[100vh] bg-dark-100 rounded-md flex flex-col w-full shadow-2xl'>
			{children}
		</section>
	);
}

export default function MainContentHeader({
	profile,
	firstname,
	lastname,
	userID,
	type,
	showBackBtn,
}) {
	return (
		<header className='border-b border-dark-200 p-3 flex gap-2'>
			{showBackBtn && (
				<div className='sm:hidden flex items-center'>
					<BackButton />
				</div>
			)}
			<div
				className={`flex gap-2 items-center ${
					type !== 'user' ? 'pointer-events-none' : ''
				}`}
			>
				<Link className='hover:underline' to={`/profile/${userID}`}>
					<img className='size-10 rounded-full' src={profile} alt='' />
				</Link>
				<Link className='hover:underline' to={`/profile/${userID}`}>
					<p>{_.startCase(`${firstname} ${lastname}`)}</p>
				</Link>
			</div>
		</header>
	);
}
