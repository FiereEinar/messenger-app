import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	useEffect(() => {
		const bearerToken = localStorage.getItem('Token');
		if (!bearerToken) return navigate('/login');

		const token = bearerToken.split(' ')[1];
		if (!token) return navigate('/login');

		const user = jwtDecode(token).user;
		if (!user) return navigate('/login');
	}, [navigate]);

	return children;
}
