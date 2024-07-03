import { useQuery } from '@tanstack/react-query';
import { MainContentContainer } from './MainContent';
import { fetchUserByID } from '@/api/user';
import ProfileEditForm from './forms/ProfileEditForm';
import DefaultPage from '@/pages/DefaultPage';

export default function ProfileEditSection() {
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
	});

	if (isLoading) {
		return <DefaultPage title='Loading...' />;
	}

	if (error) {
		return <DefaultPage title='Error fetching user' />;
	}

	return (
		<MainContentContainer>
			<ProfileEditForm userData={userData} />
		</MainContentContainer>
	);
}
