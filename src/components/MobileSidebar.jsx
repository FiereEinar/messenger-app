import { PrimarySidebarContainer, PrimarySidebarNav } from './Sidebar';

export default function MobileSidebar() {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<PrimarySidebarContainer>
			<div className='w-full flex justify-between'>
				<PrimarySidebarNav
					linkTo={`/global/${import.meta.env.VITE_GLOBAL_ID}`}
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

				<PrimarySidebarNav
					linkTo={`/profile/${currentUserID}`}
					icon='/icons/profile.svg'
					title='Profile'
				/>
				<PrimarySidebarNav
					linkTo={currentUserID ? '/logout' : '/login'}
					icon='/icons/logout.svg'
					title={currentUserID ? 'Logout' : 'Login'}
				/>
			</div>
		</PrimarySidebarContainer>
	);
}
