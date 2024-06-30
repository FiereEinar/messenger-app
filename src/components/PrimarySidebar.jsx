import SidebarNav from './SidebarNav';

export default function PrimarySidebar() {
	return (
		<aside className='h-[96.5vh] bg-dark rounded-md flex flex-col justify-between'>
			<div>
				<SidebarNav linkTo='/global' icon='/icons/global.svg' title='Global' />
				<SidebarNav linkTo='/chats' icon='/icons/message.svg' title='Chats' />
				<SidebarNav linkTo='/groups' icon='/icons/groups.svg' title='Groups' />
			</div>
			<div>
				<SidebarNav
					linkTo='/profile'
					icon='/icons/profile.svg'
					title='Profile'
				/>
				<SidebarNav linkTo='/logout' icon='/icons/logout.svg' title='Logout' />
			</div>
		</aside>
	);
}
