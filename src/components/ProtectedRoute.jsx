import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { toast } = useToast();

	useEffect(() => {
		const userID = localStorage.getItem('UserID');
		if (!userID) return navigate('/login');
	}, [navigate, toast]);

	return children;
}
