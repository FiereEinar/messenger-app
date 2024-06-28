import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import Landingpage from './pages/Landingpage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <NotFoundPage />,
			children: [
				{
					index: true,
					element: <Landingpage />,
				},
			],
		},
		{
			path: 'signup',
			element: <SignupPage />,
		},
		{
			path: 'login',
			element: <LoginPage />,
		},
	]);

	return <RouterProvider router={route} />;
}
