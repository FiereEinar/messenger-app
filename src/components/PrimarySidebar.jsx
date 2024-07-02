import { PrimarySidebarContainer, PrimarySidebarNav } from './Sidebar';

export default function PrimarySidebar() {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<PrimarySidebarContainer>
			<div>
				<PrimarySidebarNav
					linkTo='/global'
					icon='/icons/global.svg'
					title='Global'
				/>
				<PrimarySidebarNav
					linkTo='/chats'
					icon='/icons/message.svg'
					title='Chats'
				/>
				<PrimarySidebarNav
					linkTo='/groups'
					icon='/icons/groups.svg'
					title='Groups'
				/>
			</div>
			<div>
				<PrimarySidebarNav
					linkTo={`/profile/${currentUserID}`}
					icon='/icons/profile.svg'
					title='Profile'
				/>
				<PrimarySidebarNav
					linkTo='/logout'
					icon='/icons/logout.svg'
					title='Logout'
				/>
			</div>
		</PrimarySidebarContainer>
	);
}
