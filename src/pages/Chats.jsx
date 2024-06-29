import { Outlet } from 'react-router-dom';

export default function Chats() {
	return (
		<section className='min-h-max w-full flex gap-3'>
			<aside className='min-h-max bg-dark-100 p-2 rounded-md flex flex-col gap-1 shadow-2xl'>
				<h1 className='text-2xl font-semibold'>Chats</h1>
				{/* LIST OF CHATS */}
			</aside>

			<Outlet />
		</section>
	);
}
