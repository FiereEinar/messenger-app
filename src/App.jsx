import { Outlet } from 'react-router-dom';
import PrimarySidebar from './components/PrimarySidebar';

function App() {
	return (
		<main className='relative bg-dark min-h-screen w-full text-white flex md:p-3 sm:gap-3'>
			<PrimarySidebar />
			<Outlet />
			{/* for desktop, with gap */}
			{/* <div className='hidden sm:flex w-full gap-3'>
				<PrimarySidebar />
				<Outlet />
			</div> */}

			{/* for mobile */}
			{/* <div className='sm:hidden h-full w-full flex'>
				<PrimarySidebar />
				<Outlet />
			</div> */}
		</main>
	);
}

export default App;
