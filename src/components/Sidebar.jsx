/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export function PrimarySidebarContainer({ children }) {
	return (
		// <aside className='md:h-[96.5vh] h-screen bg-dark rounded-md md:flex flex-col justify-between hidden'>
		<aside className='md:h-[96.5vh] h-screen bg-dark rounded-md w-fit flex flex-col justify-between p-1 md:p-0 flex-shrink-0'>
			{children}
		</aside>
	);
}

export function PrimarySidebarNav({ linkTo, icon, title }) {
	const navlinkClassCallback = ({ isActive, isPending }) => {
		const baseClass =
			'transition flex items-center justify-start gap-2 hover:bg-dark-200 p-3 lg:px-2 lg:py-2 lg:pr-10 rounded-md mb-1';
		const navlinkClass = isPending
			? 'text-gray-500'
			: isActive
			? 'bg-dark-200'
			: '';

		return `${navlinkClass} ${baseClass}`;
	};

	return (
		<NavLink to={linkTo} className={navlinkClassCallback}>
			<img className='!size-6' src={icon} alt='' />
			<p className='font-semibold hidden lg:block'>{title}</p>
		</NavLink>
	);
}

export function SecondarySidebarAndMainContainer({ children }) {
	return (
		<section className='min-h-max w-full flex p-0 sm:p-1 md:p-0 gap-1 md:gap-3'>
			{children}
		</section>
	);
}

export function SecondarySidebarAside({ children }) {
	return (
		<aside className='md:h-[96.5vh] h-full flex w-full sm:w-[20rem] flex-shrink-0 bg-dark-100 p-3 rounded-md  flex-col shadow-2xl'>
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
