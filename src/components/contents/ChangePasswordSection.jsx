import { useNavigate } from 'react-router-dom';
import { MainContentContainer } from '../MainContent';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import { useEffect } from 'react';

export default function ChangePasswordSection() {
	const navigate = useNavigate();
	const userID = localStorage.getItem('UserID');

	useEffect(() => {
		if (!userID) return navigate('/login');
	}, [userID, navigate]);

	return (
		<MainContentContainer>
			<ChangePasswordForm userID={userID} />
		</MainContentContainer>
	);
}
