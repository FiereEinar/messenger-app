import { SecondarySidebarAndMainContainer } from '@/components/Sidebar';
import ProfileSecondarySidebar from '@/components/secondarySidebars/ProfileSecondarySidebar';
import { Outlet, useParams } from 'react-router-dom';

export default function Profile() {
	const { userID } = useParams();

	return (
		<SecondarySidebarAndMainContainer>
			{/* SECONDARY SIDEBAR */}
			{/* hide this sidebar when viewing a profile in mobile */}
			<div className={`sm:flex sm:w-fit w-full ${userID ? 'hidden' : ''}`}>
				<ProfileSecondarySidebar />
			</div>

			{/* MAIN CONTENT */}
			{/* hide this sidebar when NOT viewing a profile in mobile */}
			<div className={`sm:flex w-full ${userID ? 'flex' : 'hidden'}`}>
				<Outlet />
			</div>
		</SecondarySidebarAndMainContainer>
	);
}
