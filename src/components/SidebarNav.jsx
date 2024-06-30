/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export default function SidebarNav({ linkTo, icon, title }) {
	const navlinkClassCallback = ({ isActive, isPending }) => {
		const baseClass =
			'transition flex items-center justify-start gap-2 hover:bg-dark-200 px-2 py-2 pr-6 rounded-md mb-1';
		const navlinkClass = isPending
			? 'text-gray-500'
			: isActive
			? 'bg-dark-200'
			: '';

		return `${navlinkClass} ${baseClass}`;
	};

	return (
		<NavLink to={linkTo} className={navlinkClassCallback}>
			<img className='size-6' src={icon} alt='' />
			<p className='font-semibold'>{title}</p>
		</NavLink>
	);
}
