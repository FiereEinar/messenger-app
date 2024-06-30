import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout() {
	useEffect(() => {
		localStorage.removeItem('Token');
		localStorage.removeItem('UserID');
	}, []);

	return <Navigate to='/login' />;
}
