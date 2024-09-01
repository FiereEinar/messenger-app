import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';
import axiosInstance from '@/api/axiosInstance';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { toast } = useToast();

	useEffect(() => {
		(async () => {
			try {
				await axiosInstance.get('/auth/check');
			} catch (e) {
				return navigate('/login');
			}
		})();
	}, [navigate, toast]);

	return children;
}
