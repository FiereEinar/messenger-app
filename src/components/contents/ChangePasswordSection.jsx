import { useNavigate } from 'react-router-dom';
import { MainContentContainer } from '../MainContent';
import ChangePasswordForm from '../forms/ChangePasswordForm';

export default function ChangePasswordSection() {
	const navigate = useNavigate();
	const userID = localStorage.getItem('UserID');

	if (!userID) return navigate('/login');

	return (
		<MainContentContainer>
			<ChangePasswordForm userID={userID} />
		</MainContentContainer>
	);
}
