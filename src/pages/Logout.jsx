import { updateUserStatus } from '@/api/user';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout() {
	useEffect(() => {
		const currentUserID = localStorage.getItem('UserID');

		if (currentUserID) {
			updateUserStatus(currentUserID, { status: false });
		}

		localStorage.removeItem('Token');
		localStorage.removeItem('UserID');
	}, []);

	return <Navigate to='/login' />;
}
