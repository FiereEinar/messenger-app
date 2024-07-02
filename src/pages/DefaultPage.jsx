import { MainContentContainer } from '@/components/MainContent';

/* eslint-disable react/prop-types */
export default function DefaultPage({ title }) {
	return (
		<MainContentContainer>
			<h1 className='text-5xl font-bold text-dark-500 m-5'>{title}</h1>
		</MainContentContainer>
	);
}
