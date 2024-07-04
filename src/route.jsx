import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Chats from './pages/Chats';
import Groups from './pages/Groups';
import DefaultPage from './pages/DefaultPage';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import ProfileSection from './components/contents/ProfileSection';
import ProfileEditSection from './components/contents/ProfileEditSection';
import CreateGroupSection from './components/contents/CreateGroupSection';
import ChangePasswordSection from './components/contents/ChangePasswordSection';
import UserChat from './components/UserChat';
import GroupChat from './components/GroupChat';
import Global from './pages/Global';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			errorElement: <NotFoundPage />,
			element: (
				<ProtectedRoute>
					<App />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <Navigate to='/chats' />,
				},
				{
					path: '/global/:groupID',
					element: <Global />,
				},
				{
					path: '/chats',
					element: <Chats />,
					children: [
						{
							index: true,
							element: <DefaultPage title='Chats' />,
						},
						{
							path: '/chats/:friendID',
							element: <UserChat />,
						},
					],
				},
				{
					path: '/groups',
					element: <Groups />,
					children: [
						{
							index: true,
							element: <DefaultPage title='Groups' />,
						},
						{
							path: '/groups/create',
							element: <CreateGroupSection />,
						},
						{
							path: '/groups/chats/:groupID',
							element: <GroupChat />,
						},
					],
				},
				{
					path: '/profile',
					element: <Profile />,
					children: [
						{
							path: '/profile/:userID',
							element: <ProfileSection />,
						},
						{
							path: '/profile/edit/:userID',
							element: <ProfileEditSection />,
						},
						{
							path: '/profile/change/password/:userID',
							element: <ChangePasswordSection />,
						},
					],
				},
				{
					path: '/logout',
					element: <Logout />,
				},
			],
		},
		{
			path: '/signup',
			element: <SignupPage />,
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
	]);

	return <RouterProvider router={route} />;
}
