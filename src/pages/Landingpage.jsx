import { Link } from 'react-router-dom';

export default function Landingpage() {
	return (
		<main>
			<section>
				<h1>Landing Page</h1>
				<Link to='login'>Login</Link>
				<Link to='signup'>Signup</Link>
			</section>
		</main>
	);
}
