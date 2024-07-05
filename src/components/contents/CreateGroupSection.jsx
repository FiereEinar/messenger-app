import { fetchUserByID } from '@/api/user';
import { MainContentContainer } from '../MainContent';
import CreateGroupForm from '../forms/CreateGroupForm';
import { useQuery } from '@tanstack/react-query';
import DefaultPage from '@/pages/DefaultPage';
import BackButton from '../BackButton';

export default function CreateGroupSection() {
	const userID = localStorage.getItem('UserID');
	const {
		data: userData,
		isLoading,
		error,
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
			<section className='p-3'>
				<div className='sm:p-3 pb-3 border-b border-dark-400 flex items-center gap-1'>
					{/* back button for small devices */}
					<div className='sm:hidden flex'>
						<BackButton />
					</div>
					<h1 className='text-2xl font-semibold'>Create Group</h1>
				</div>
				<CreateGroupForm userData={userData} />
			</section>
		</MainContentContainer>
	);
}
