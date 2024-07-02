/* eslint-disable react/prop-types */
import _ from 'lodash';
import { Link } from 'react-router-dom';

export function MainContentContainer({ children }) {
	return (
		<section className='h-[96.5vh] bg-dark-100 rounded-md flex flex-col w-full shadow-2xl'>
			{children}
		</section>
	);
}

export default function MainContentHeader({
	profile,
	firstname,
	lastname,
	userID,
}) {
	return (
		<header className='border-b border-dark-200 p-3'>
			<div className='flex gap-2 items-center'>
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
