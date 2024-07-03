/* eslint-disable react/prop-types */
import { UserCardLoading } from './LoadingScreens';
import UserCard from './UserCard';

export default function GroupsFeed({ groups, isLoading, error }) {
	console.log(groups);
	return (
		<div className='flex flex-col gap-1 overflow-auto'>
			{isLoading && <UserCardLoading />}
			{error && <p className='text-destructive'>Failed to load groups</p>}
			{groups && groups.length === 0 && (
				<p className='text-sm italic text-dark-500'>
					You currently have no groups
				</p>
			)}
			{groups &&
				groups.length > 0 &&
				groups.map((group) => (
					<UserCard
						key={group._id}
						userID={group._id}
						profileURL={group.profile.url}
						firstname={group.name}
						lastname={' '}
						username={' '}
					/>
				))}
		</div>
	);
}
