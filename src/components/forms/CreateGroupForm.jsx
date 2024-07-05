/* eslint-disable react/prop-types */
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../InputField';
import { useForm } from 'react-hook-form';
import { createGroupValidation } from '@/lib/validations/groupSchema';
import { useState } from 'react';
import UserClickable from '../UserClickable';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { postGroup } from '@/api/group';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserByID } from '@/api/user';

export default function CreateGroupForm({ userData }) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [searchOutput, setSearchOutput] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [profilePicture, setProfilePicture] = useState(null);

	const { refetch } = useQuery({
		queryKey: [`user_${userData._id}`],
		queryFn: () => fetchUserByID(userData._id),
	});

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createGroupValidation),
	});

	const handlerSearchMembers = (e) => {
		const searchTerm = e.target.value;
		if (searchTerm.length === 0) {
			setSearchOutput([]);
			return;
		}

		if (userData.friends.length === 0) {
			setError('root', { message: 'You have no friends to add' });
		}

		const filteredFriends = userData.friends.filter((friend) => {
			const fullname = friend.firstname + friend.lastname;

			if (
				fullname.includes(searchTerm) &&
				!selectedMembers.includes(friend._id)
			)
				return true;
			return false;
		});

		setSearchOutput(filteredFriends);
	};

	const onAddMemberHandler = (userID) => {
		setSelectedMembers((prev) => [...prev, userID]);
		setSearchOutput([]);
	};

	const onRemoveMemberHandler = (userID) => {
		const filtered = selectedMembers.filter((memberID) => memberID !== userID);
		setSelectedMembers(filtered);
	};

	const onFormSubmit = async (data) => {
		try {
			if (profilePicture === null) {
				toast({
					variant: 'destructive',
					title: 'Fill in the form',
					description: 'Please select a group photo',
				});
				return;
			}

			if (selectedMembers.length === 0) {
				toast({
					variant: 'destructive',
					title: 'Fill in the form',
					description:
						"Please select some group members, what's the point of creating a group if you're the only one in it?",
				});
				return;
			}

			const formData = new FormData();

			formData.append('name', data.name);
			formData.append('creatorID', userData._id);
			formData.append('members', JSON.stringify(selectedMembers));
			formData.append('groupProfile', profilePicture);

			const result = await postGroup(formData);
			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to create group',
					description: result.message,
				});
				return;
			}

			toast({
				title: 'Group Created!',
				description: 'The group has been successfully created',
			});
			refetch();
			navigate('/groups');
		} catch (err) {
			console.error('Error updating user', err);
			toast({
				variant: 'destructive',
				title: 'Network Error',
				description: 'Failed to create group',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className='p-3 flex flex-col gap-2'
		>
			{/* GROUP PROFILE PHOTO */}
			<div className='border-b border-dark-400 pb-5'>
				<div className='flex justify-between'>
					<h1 className='text-lg'>Group Profile</h1>
					<div className='relative overflow-hidden'>
						<Button
							disabled={isSubmitting}
							type='button'
							variant='secondary'
							size='sm'
						>
							<p className='font-semibold'>Change</p>
							<img
								className='size-4 ml-2 mb-[1px]'
								src='/icons/edit.svg'
								alt=''
							/>
						</Button>
						<input
							disabled={isSubmitting}
							onChange={(e) => setProfilePicture(e.target.files[0])}
							className='absolute border top-0 -left-[7rem] h-full opacity-0 cursor-pointer'
							type='file'
							accept='image/*'
						/>
					</div>
				</div>
				<div className='flex justify-center'>
					<img
						className='size-[12rem] rounded-full object-cover object-center'
						src={
							profilePicture === null
								? '/default_pic.jpg'
								: URL.createObjectURL(profilePicture)
						}
						alt=''
					/>
				</div>
			</div>

			{/* GROUP NAME FIELD} */}
			<InputField
				register={{ ...register('name') }}
				error={errors.name}
				id='name'
				label='Group name:'
				type='text'
			/>

			{/* GROUP MEMBERS FIELD */}
			<div className='relative flex flex-col'>
				<label htmlFor='members'>Select Members:</label>
				<input
					onChange={handlerSearchMembers}
					type='text'
					id='members'
					placeholder='Search friends'
					className='rounded-sm p-1 px-2 bg-dark-200 text-lg'
				/>
				<div>
					<div className='absolute w-full bg-dark-300 rounded-b-md'>
						{searchOutput.length > 0 &&
							searchOutput.map((friend) => (
								<UserClickable
									onClick={() => onAddMemberHandler(friend._id)}
									key={friend._id}
									firstname={friend.firstname}
									lastname={friend.lastname}
									profileURL={friend.profile.url}
									username={friend.username}
								/>
							))}
					</div>
				</div>
			</div>

			{errors.root && (
				<p className='text-red-500 text-sm'>{errors.root.message}</p>
			)}

			{/* SELECTED MEMBERS LIST */}
			<div className='max-h-[8rem] overflow-auto'>
				{selectedMembers.length > 0 &&
					selectedMembers.map((memberID) => {
						const member = userData.friends.find(
							(friend) => friend._id === memberID
						);

						return (
							<UserClickable
								onClick={() => onRemoveMemberHandler(member._id)}
								key={member._id}
								firstname={member.firstname}
								lastname={member.lastname}
								profileURL={member.profile.url}
								username={member.username}
							/>
						);
					})}
			</div>

			{/* FORM SUBMIT BUTTON */}
			<div className='flex justify-end mt-3'>
				<Button disabled={isSubmitting} variant='secondary'>
					Create Group
				</Button>
			</div>
		</form>
	);
}
