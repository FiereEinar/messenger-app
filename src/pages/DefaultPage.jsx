/* eslint-disable react/prop-types */
export default function DefaultPage({ title }) {
	return (
		<section className='min-h-max bg-dark-100 p-2 rounded-md flex justify-center items-center w-full gap-1 shadow-2xl'>
			<h1 className='text-5xl font-bold text-dark-500'>{title}</h1>
		</section>
	);
}
