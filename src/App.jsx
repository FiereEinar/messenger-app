import { Outlet } from 'react-router-dom';
import PrimarySidebar from './components/PrimarySidebar';

function App() {
	return (
		<main className='relative bg-dark min-h-screen w-full text-white flex md:p-3 md:gap-3'>
			<PrimarySidebar />
			<Outlet />
		</main>
	);
}

export default App;
