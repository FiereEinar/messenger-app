import { Outlet, useNavigate } from 'react-router-dom';
import PrimarySidebar from './components/PrimarySidebar';
import { useEffect } from 'react';

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/chats');
	}, [navigate]);

	return (
		<main className='bg-dark flex min-h-screen w-full text-white p-3 gap-3'>
			<PrimarySidebar />
			<Outlet />
		</main>
	);
}

export default App;
