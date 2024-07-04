import { SecondarySidebarAndMainContainer } from '@/components/Sidebar';
import ChatsSecondarySidebar from '@/components/secondarySidebars/ChatsSecondarySidebar';
import { Outlet, useParams } from 'react-router-dom';

export default function Chats() {
	const { friendID } = useParams();

	return (
		<SecondarySidebarAndMainContainer>
			{/* SECONDARY SIDEBAR */}
			{/* hide this sidebar when viewing a chat in mobile */}
			<div className={`sm:flex sm:w-fit w-full ${friendID ? 'hidden' : ''}`}>
				<ChatsSecondarySidebar />
			</div>

			{/* MAIN CONTENT */}
			{/* hide this sidebar when NOT viewing a chat in mobile */}
			<div className={`sm:flex w-full ${friendID ? 'flex' : 'hidden'}`}>
				<Outlet />
			</div>
		</SecondarySidebarAndMainContainer>
	);
}
