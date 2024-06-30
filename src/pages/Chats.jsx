import { fetchUserByID } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { NavLink, Outlet } from 'react-router-dom';

export default function Chats() {
	const userID = localStorage.getItem('UserID');

	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	return (
		<section className='min-h-max w-full flex gap-3'>
			<aside className='h-[96.5vh] w-[30rem] bg-dark-100 p-2 rounded-md flex flex-col gap-1 shadow-2xl'>
				<h1 className='text-2xl font-semibold'>Chats</h1>
				{/* LIST OF CHATS */}
				<div className='mt-5'>
					{isLoading && <p>Loading chats...</p>}
					{error && <p>Error loading chats...</p>}
					{!isLoading &&
						userData.friends.map((friend) => (
							<NavLink
								to={friend._id}
								className={navlinkClassCallback}
								key={friend._id}
							>
								<img
									className='size-10 rounded-full'
									src={friend.profile.url}
									alt='profile'
								/>
								<p>{_.startCase(`${friend.firstname} ${friend.lastname}`)}</p>
							</NavLink>
						))}
				</div>
			</aside>

			<Outlet />
		</section>
	);
}

const navlinkClassCallback = ({ isActive, isPending }) => {
	const baseClass =
		'transition flex justify-start items-center gap-2 p-2 rounded-md hover:bg-dark-200';
	const navlinkClass = isPending
		? 'text-gray-500'
		: isActive
		? 'bg-dark-200'
		: '';

	return `${navlinkClass} ${baseClass}`;
};
