import { useEffect, useState } from 'react';
import SearchUsersFeed from '../SearchUsersFeed';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
} from '../Sidebar';
import UsersFeed from '../UsersFeed';
import { fetchUserByID } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ToastAction } from '../ui/toast';

export default function ChatsSecondarySidebar() {
	const navigate = useNavigate();
	const [addMode, setAddMode] = useState(false);

	const { toast } = useToast();
	const userID = localStorage.getItem('UserID');

	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Network error',
				description: 'Failed to load chats',
			});

			// if the server responds with 'Unauthorized' even though there's a token, it means it is expired
			if (
				error.response?.data === 'Unauthorized' &&
				localStorage.getItem('Token')
			) {
				toast({
					variant: 'destructive',
					title: 'Expired Token Detected',
					description: 'Login again to get new token',
					action: (
						<ToastAction onClick={() => navigate('/logout')} altText='Logout'>
							Logout
						</ToastAction>
					),
				});
			}
		}
	}, [error, toast, navigate]);

	return (
		<SecondarySidebarAside>
			<SecondarySidebarAsideHeader>
				<SecondarySidebarAsideHeaderText>
					{addMode ? 'Search Users' : 'Chats'}
				</SecondarySidebarAsideHeaderText>
				<button
					onClick={() => setAddMode(!addMode)}
					className='transition hover:bg-dark-300 rounded-full p-1'
				>
					<img
						className={`transition size-8 ${addMode ? 'rotate-45' : ''}`}
						src={'/icons/add.svg'}
						alt=''
					/>
				</button>
			</SecondarySidebarAsideHeader>
			{/* SIDEBAR CONTENT */}
			{addMode ? (
				<SearchUsersFeed />
			) : (
				<UsersFeed
					users={userData?.friends}
					isLoading={isLoading}
					error={error}
				/>
			)}
		</SecondarySidebarAside>
	);
}
