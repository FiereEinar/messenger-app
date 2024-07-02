/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export function PrimarySidebarContainer({ children }) {
	return (
		<aside className='h-[96.5vh] bg-dark rounded-md flex flex-col justify-between'>
			{children}
		</aside>
	);
}

export function PrimarySidebarNav({ linkTo, icon, title }) {
	const navlinkClassCallback = ({ isActive, isPending }) => {
		const baseClass =
			'transition flex items-center justify-start gap-2 hover:bg-dark-200 px-2 py-2 pr-10 rounded-md mb-1';
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

export function SecondarySidebarContainer({ children }) {
	return <section className='min-h-max w-full flex gap-3'>{children}</section>;
}

export function SecondarySidebarAside({ children }) {
	return (
		<aside className='h-[96.5vh] w-[30rem] bg-dark-100 p-3 rounded-md flex flex-col shadow-2xl'>
			{children}
		</aside>
	);
}

export function SecondarySidebarAsideHeader({ children }) {
	return <div className='flex justify-between mb-3'>{children}</div>;
}

export function SecondarySidebarAsideHeaderText({ children }) {
	return (
		<h1 className='text-2xl font-semibold flex items-center'>{children}</h1>
	);
}
