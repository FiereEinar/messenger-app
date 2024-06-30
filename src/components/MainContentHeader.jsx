/* eslint-disable react/prop-types */
import _ from 'lodash';

export default function MainContentHeader({ profile, firstname, lastname }) {
	return (
		<header className='border-b border-dark-200 p-3'>
			<div className='flex gap-2 items-center'>
				<img className='size-10 rounded-full' src={profile} alt='' />
				<p>{_.startCase(`${firstname} ${lastname}`)}</p>
			</div>
		</header>
	);
}
