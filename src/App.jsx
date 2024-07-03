import { Outlet } from 'react-router-dom';
import PrimarySidebar from './components/PrimarySidebar';

function App() {
	return (
		<main className='bg-dark flex min-h-screen w-full text-white p-3 gap-3'>
			<PrimarySidebar />
			<Outlet />
		</main>
	);
}

export default App;
