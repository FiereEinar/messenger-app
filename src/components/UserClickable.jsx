/* eslint-disable react/prop-types */
import _ from 'lodash';

export default function UserClickable({
	onClick,
	profileURL,
	firstname,
	lastname,
	username,
}) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='transition flex justify-start items-center gap-2 p-2 rounded-md hover:bg-dark-200 w-full'
		>
			<img
				className='size-10 rounded-full object-cover object-center'
				src={profileURL}
				alt='profile'
			/>
			<div className='flex flex-col'>
				<p>{_.startCase(`${firstname} ${lastname}`)}</p>
				{username && (
					<p className='text-xs text-dark-500 text-start'>@{username}</p>
				)}
			</div>
		</button>
	);
}
