import { useQuery } from '@tanstack/react-query';
import { MainContentContainer } from './MainContent';
import { fetchUserByID } from '@/api/user';
import ProfileEditForm from './forms/ProfileEditForm';

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
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error fetching user</p>;
	}

	return (
		<MainContentContainer>
			<ProfileEditForm userData={userData} />
		</MainContentContainer>
	);
}
