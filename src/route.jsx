import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Chats from './pages/Chats';
import Groups from './pages/Groups';
import DefaultPage from './pages/DefaultPage';
import ChatSection from './components/ChatSection';
import Logout from './pages/Logout';

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
					path: '/chats',
					element: <Chats />,
					children: [
						{
							index: true,
							element: <DefaultPage title='Chats' />,
						},
						{
							path: '/chats/:friendID',
							element: <ChatSection />,
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
