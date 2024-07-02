import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarContainer,
} from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Groups() {
	return (
		<SecondarySidebarContainer>
			<SecondarySidebarAside>
				<SecondarySidebarAsideHeader>
					<SecondarySidebarAsideHeaderText>
						Groups
					</SecondarySidebarAsideHeaderText>
				</SecondarySidebarAsideHeader>
				{/* sidebar content */}
			</SecondarySidebarAside>

			{/* MAIN CONTENT */}
			<Outlet />
		</SecondarySidebarContainer>
	);
}
