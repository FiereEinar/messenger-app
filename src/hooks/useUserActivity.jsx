import { updateUserStatus } from '@/api/user';
import { useEffect } from 'react';

export default function useUserActivity(userID) {
	useEffect(() => {
		if (userID === null) return;

		const handleVisibilityChange = async () => {
			try {
				if (document.hidden) {
					await updateUserStatus(userID, { status: false });
				} else {
					await updateUserStatus(userID, { status: true });
				}
			} catch (err) {
				console.error(
					'Failed to update user status on visibility change:',
					err
				);
			}
		};

		const handleBeforeUnload = async () => {
			try {
				await updateUserStatus(userID, { status: false });
			} catch (error) {
				console.error('Failed to update user status before unload:', error);
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		window.addEventListener('beforeunload', handleBeforeUnload);

		// Clean up event listeners on component unmount
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [userID]);
}
