import { fetchUserByID } from '@/api/user';
import SearchUsersFeed from '@/components/SearchUsersFeed';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarContainer,
} from '@/components/Sidebar';
import UsersFeed from '@/components/UsersFeed';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Chats() {
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
				error.response.data === 'Unauthorized' &&
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
		<SecondarySidebarContainer>
			<SecondarySidebarAside>
				<SecondarySidebarAsideHeader>
					<SecondarySidebarAsideHeaderText>
						{addMode ? 'Users' : 'Chats'}
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

			{/* MAIN CONTENT */}
			<Outlet />
		</SecondarySidebarContainer>
	);
}
