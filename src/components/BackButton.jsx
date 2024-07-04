import { useNavigate } from 'react-router-dom';

export default function BackButton() {
	const navigate = useNavigate();

	return (
		<button
			type='button'
			className='transition hover:bg-dark-200 rounded-full p-1 flex-shrink-0'
			onClick={() => navigate(-1)}
		>
			<img className='size-7' src='/icons/back.svg' alt='b' />
		</button>
	);
}
