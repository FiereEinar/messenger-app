import { Link, useParams } from 'react-router-dom';
import { MainContentContainer } from '../MainContent';
import { useQuery } from '@tanstack/react-query';
import { fetchUserByID } from '@/api/user';
import _ from 'lodash';
import { Button } from '../ui/button';
import CoverPhoto from '../CoverPhoto';
import DefaultPage from '@/pages/DefaultPage';

export default function ProfileSection() {
	const { userID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: userData,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	if (isLoading) {
		return <DefaultPage title='Loading...' />;
	}

	if (error) {
		return <DefaultPage title='Error fetching user' />;
	}

	return (
		<MainContentContainer>
			{/* USER COVER AND PROFILE AREA */}
			<div className='relative p-3'>
				<CoverPhoto
					refetch={refetch}
					userID={userData._id}
					imageURL={
						userData.cover.url.length > 0
							? userData.cover.url
							: '/default_cover.svg'
					}
				/>
				{/* empty space below cover photo */}
				<div className='h-16'></div>
				{/* profile photo */}
				<div className='absolute bottom-3 left-6 size-[10rem]'>
					<img
						className='rounded-full'
						src={userData.profile.url}
						alt='Profile'
					/>
				</div>
			</div>

			{/* USER FULLNAME AND USERNAME AREA */}
			<div className='px-6 flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-semibold'>
						{_.startCase(`${userData.firstname} ${userData.lastname}`)}
					</h2>
					<p className='text-dark-500'>@{userData.username}</p>
					<p className='pt-5 text-dark-500'>{userData.bio}</p>
				</div>
				{userData._id === currentUserID ? (
					<Button variant='secondary'>
						<Link to={`/profile/edit/${currentUserID}`}>Edit Profile</Link>
					</Button>
				) : (
					<Button variant='secondary'>
						<Link to={`/chats/${userID}`}>Send Message</Link>
					</Button>
				)}
			</div>

			{/* user friends */}
			<div></div>
		</MainContentContainer>
	);
}