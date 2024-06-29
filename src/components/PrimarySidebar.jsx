import { NavLink } from 'react-router-dom';

export default function PrimarySidebar() {
	return (
		<aside className='min-h-max bg-dark rounded-md flex flex-col gap-1'>
			<NavLink to='/chats' className={navlinkClassCallback}>
				<img className='size-6' src='/icons/message.svg' alt='' />
				<p>Chats</p>
			</NavLink>
			<NavLink to='/groups' className={navlinkClassCallback}>
				<img className='size-6' src='/icons/groups.svg' alt='' />
				<p>Groups</p>
			</NavLink>
		</aside>
	);
}

const navlinkClassCallback = ({ isActive, isPending }) => {
	const baseClass =
		'flex items-center justify-start gap-2 hover:bg-dark-200 px-2 py-2 pr-6 rounded-md';
	const navlinkClass = isPending
		? 'text-gray-500'
		: isActive
		? 'bg-dark-200'
		: '';

	return `${navlinkClass} ${baseClass}`;
};
