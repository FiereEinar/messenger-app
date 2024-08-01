import { Outlet } from 'react-router-dom';
import PrimarySidebar from './components/PrimarySidebar';
import useUserActivity from './hooks/useUserActivity';
import { useEffect } from 'react';
import { updateUserStatus } from './api/user';

function App() {
	const currentUserID = localStorage.getItem('UserID');

	useUserActivity(currentUserID);

	useEffect(() => {
		const fn = async () => {
			if (currentUserID) {
				console.log(currentUserID);
				await updateUserStatus(currentUserID, { status: true });
			}
		};
		fn();
	}, [currentUserID]);

	return (
		<main className='relative bg-dark min-h-screen w-full text-white flex flex-col-reverse sm:flex-row md:p-3 md:gap-3'>
			<PrimarySidebar />
			<Outlet />
		</main>
	);
}

export default App;
