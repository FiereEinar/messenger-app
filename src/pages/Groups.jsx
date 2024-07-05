import { SecondarySidebarAndMainContainer } from '@/components/Sidebar';
import GroupsSecondarySidebar from '@/components/secondarySidebars/GroupsSecondarySidebar';

import { Outlet, useLocation, useParams } from 'react-router-dom';

export default function Groups() {
	const { groupID } = useParams();
	const inCreateLoc = useLocation().pathname.split('/')[2];

	return (
		<SecondarySidebarAndMainContainer>
			{/* SECONDARY SIDEBAR */}
			{/* hide this sidebar when viewing a chat in mobile */}
			<div
				className={`sm:flex sm:w-fit w-full ${
					groupID || inCreateLoc ? 'hidden' : ''
				}`}
			>
				<GroupsSecondarySidebar />
			</div>

			{/* MAIN CONTENT */}
			{/* hide this sidebar when NOT viewing a chat in mobile */}
			<div
				className={`sm:flex w-full ${
					groupID || inCreateLoc ? 'flex' : 'hidden'
				}`}
			>
				<Outlet />
			</div>
		</SecondarySidebarAndMainContainer>
	);
}
