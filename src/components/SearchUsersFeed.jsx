import { useQuery } from '@tanstack/react-query';
import UsersFeed from './UsersFeed';
import { fetchUsers } from '@/api/user';
import { useEffect, useState } from 'react';

export default function SearchUsersFeed() {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const { data, isLoading, error } = useQuery({
		queryKey: [`users`],
		queryFn: fetchUsers,
	});

	useEffect(() => {
		if (!data && searchTerm.length === 0) return;

		const filteredUsers = data.filter((user) => {
			const fullname = `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`;
			const username = user.username.toLowerCase();

			if (fullname.includes(searchTerm) || username.includes(searchTerm))
				return true;
			return false;
		});

		setUsers(filteredUsers);
	}, [data, searchTerm]);

	return (
		<div className='flex flex-col gap-3'>
			<div>
				<input
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
					className='w-full bg-dark-200 px-3 py-1 rounded-3xl'
					type='text'
				/>
			</div>
			<UsersFeed
				users={searchTerm.length === 0 ? data : users}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
}
