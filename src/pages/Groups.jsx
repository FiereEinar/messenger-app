import { SecondarySidebarAndMainContainer } from '@/components/Sidebar';
import GroupsSecondarySidebar from '@/components/secondarySidebars/GroupsSecondarySidebar';

import { Outlet, useParams } from 'react-router-dom';

export default function Groups() {
	const { groupID } = useParams();

	return (
		<SecondarySidebarAndMainContainer>
			{/* SECONDARY SIDEBAR */}
			{/* hide this sidebar when viewing a chat in mobile */}
			<div className={`sm:flex sm:w-fit w-full ${groupID ? 'hidden' : ''}`}>
				<GroupsSecondarySidebar />
			</div>

			{/* MAIN CONTENT */}
			{/* hide this sidebar when NOT viewing a chat in mobile */}
			<div className={`sm:flex w-full ${groupID ? 'flex' : 'hidden'}`}>
				<Outlet />
			</div>
		</SecondarySidebarAndMainContainer>
	);
}
