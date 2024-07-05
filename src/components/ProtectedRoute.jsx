import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useToast } from './ui/use-toast';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { toast } = useToast();

	useEffect(() => {
		const bearerToken = localStorage.getItem('Token');
		if (!bearerToken) {
			toast({
				title: 'Log in to proceed',
				description: 'Log in or create an account to explore other pages',
			});
			return navigate('/login');
		}

		const token = bearerToken.split(' ')[1];
		if (!token) return navigate('/login');

		const user = jwtDecode(token).user;
		if (!user) return navigate('/login');
	}, [navigate, toast]);

	return children;
}
