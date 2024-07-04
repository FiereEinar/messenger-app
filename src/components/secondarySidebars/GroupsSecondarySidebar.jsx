import { Link } from 'react-router-dom';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
} from '../Sidebar';
import UsersFeed from '../UsersFeed';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserGroups } from '@/api/user';

export default function GroupsSecondarySidebar() {
	const [createMode, setCreateMode] = useState(false);
	const userID = localStorage.getItem('UserID');

	const {
		data: userGroups,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${userID}_groups`],
		queryFn: () => fetchUserGroups(userID),
	});

	return (
		<SecondarySidebarAside>
			<SecondarySidebarAsideHeader>
				<SecondarySidebarAsideHeaderText>
					Groups
				</SecondarySidebarAsideHeaderText>
				<Link
					className='transition hover:bg-dark-300 rounded-full p-1'
					to={createMode ? -1 : '/groups/create'}
					onClick={() => setCreateMode(!createMode)}
				>
					<img
						className={`transition size-8 ${createMode ? 'rotate-45' : ''}`}
						src='/icons/add.svg'
						alt=''
					/>
				</Link>
			</SecondarySidebarAsideHeader>
			{/* sidebar content */}

			<UsersFeed
				type='groups/chats'
				users={userGroups}
				isLoading={isLoading}
				error={error}
			/>
		</SecondarySidebarAside>
	);
}
