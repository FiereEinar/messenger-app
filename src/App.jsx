import { Outlet } from 'react-router-dom';
import PrimarySidebar from './components/PrimarySidebar';
import useUserActivity from './hooks/useUserActivity';
import { useEffect } from 'react';
import { updateUserStatus } from './api/user';
import MobileSidebar from './components/MobileSidebar';

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
			<div className='hidden sm:flex'>
				<PrimarySidebar />
			</div>
			<div className='flex sm:hidden'>
				<MobileSidebar />
			</div>
			<Outlet />
		</main>
	);
}

export default App;
