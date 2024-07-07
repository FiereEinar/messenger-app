import { updateUserStatus } from '@/api/user';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout() {
	useEffect(() => {
		const fn = async () => {
			try {
				const currentUserID = localStorage.getItem('UserID');

				if (currentUserID) {
					await updateUserStatus(currentUserID, { status: false });
				}

				localStorage.removeItem('Token');
				localStorage.removeItem('UserID');
			} catch (error) {
				console.error('Failed to update user status on logout:', error);
			}
		};
		fn();
	}, []);

	return <Navigate to='/login' />;
}
