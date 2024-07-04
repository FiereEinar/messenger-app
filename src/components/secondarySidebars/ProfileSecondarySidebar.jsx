import { NavLink, useParams } from 'react-router-dom';
import BackButton from '../BackButton';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
} from '../Sidebar';

export default function ProfileSecondarySidebar() {
	const { userID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	return (
		<SecondarySidebarAside>
			<SecondarySidebarAsideHeader>
				<SecondarySidebarAsideHeaderText>
					<div className='flex justify-start items-center gap-1'>
						{userID !== currentUserID && <BackButton />}
						<p>{userID === currentUserID ? 'Manage' : 'User'} Profile</p>
					</div>
				</SecondarySidebarAsideHeaderText>
			</SecondarySidebarAsideHeader>

			{/* sidebar content */}
			{userID === currentUserID && (
				<div className='flex flex-col gap-1'>
					<NavLink
						to={`/profile/${currentUserID}`}
						className={navlinkClassCallback}
					>
						Profile
					</NavLink>
					<NavLink
						to={`/profile/edit/${currentUserID}`}
						className={navlinkClassCallback}
					>
						Edit Profile
					</NavLink>
					<NavLink
						to={`/profile/change/password/${currentUserID}`}
						className={navlinkClassCallback}
					>
						Change Password
					</NavLink>
				</div>
			)}
		</SecondarySidebarAside>
	);
}

const navlinkClassCallback = ({ isActive, isPending }) => {
	const baseClass =
		'transition text-dark-500 flex justify-start items-center gap-2 p-2 rounded-md hover:bg-dark-200';
	const navlinkClass = isPending
		? 'text-gray-500'
		: isActive
		? 'bg-dark-200'
		: '';

	return `${navlinkClass} ${baseClass}`;
};
