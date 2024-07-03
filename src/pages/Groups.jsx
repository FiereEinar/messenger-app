import { fetchUserGroups } from '@/api/user';
import GroupsFeed from '@/components/GroupsFeed';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarContainer,
} from '@/components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Groups() {
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
		<SecondarySidebarContainer>
			<SecondarySidebarAside>
				<SecondarySidebarAsideHeader>
					<SecondarySidebarAsideHeaderText>
						Groups
					</SecondarySidebarAsideHeaderText>
					<Link
						className='transition hover:bg-dark-300 rounded-full p-1'
						to={createMode ? '/groups' : '/groups/create'}
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

				<GroupsFeed groups={userGroups} isLoading={isLoading} error={error} />
			</SecondarySidebarAside>

			{/* MAIN CONTENT */}
			<Outlet />
		</SecondarySidebarContainer>
	);
}
