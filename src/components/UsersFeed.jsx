/* eslint-disable react/prop-types */
import { UserCardLoading } from './LoadingScreens';
import UserCard from './UserCard';

export default function UsersFeed({ users, isLoading, error }) {
	return (
		<div className='flex flex-col gap-1 overflow-auto'>
			{isLoading && <UserCardLoading />}
			{error && <p className='text-destructive'>Failed to load users</p>}
			{users && users.length === 0 && (
				<p className='text-sm italic text-dark-500'>
					You currently have no friends
				</p>
			)}
			{users &&
				users.length > 0 &&
				users.map((user) => (
					<UserCard
						key={user._id}
						userID={user._id}
						profileURL={user.profile.url}
						firstname={user.firstname}
						lastname={user.lastname}
						username={user.username}
					/>
				))}
		</div>
	);
}
