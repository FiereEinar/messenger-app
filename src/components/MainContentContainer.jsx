/* eslint-disable react/prop-types */
export default function ChatSectionContainer({ children }) {
	return (
		<section className='h-[96.5vh] bg-dark-100 rounded-md flex flex-col w-full shadow-2xl'>
			{children}
		</section>
	);
}
