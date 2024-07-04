import { MainContentContainer } from './MainContent';
import { Skeleton } from './ui/skeleton';

export function UserCardLoading() {
	return (
		<div className='mt-3 flex flex-col gap-1'>
			<Skeleton className='w-full h-14 rounded-md' />
			<Skeleton className='w-full h-14 rounded-md' />
			<Skeleton className='w-full h-14 rounded-md' />
			<Skeleton className='w-full h-14 rounded-md' />
			<Skeleton className='w-full h-14 rounded-md' />
		</div>
	);
}

export function ChatContentLoadingScreen() {
	return (
		<MainContentContainer>
			<header className='border-b border-dark-200 p-3'>
				<div className='flex gap-2 items-center'>
					<Skeleton className='size-10 rounded-full' />
					<Skeleton className='w-[10rem] h-6' />
				</div>
			</header>

			<main className='flex-grow overflow-auto border-b border-dark-200 p-3 flex flex-col gap-3'>
				<Skeleton className='w-[15rem] h-10 rounded-3xl self-end' />
				<div className='flex gap-2'>
					<Skeleton className='size-10 rounded-full' />
					<Skeleton className='w-[15rem] h-10 rounded-3xl' />
				</div>
				<Skeleton className='w-[15rem] h-10 rounded-3xl self-end' />
				<div className='flex gap-2'>
					<Skeleton className='size-10 rounded-full' />
					<Skeleton className='w-[15rem] h-20 rounded-3xl' />
				</div>
				<Skeleton className='w-[15rem] h-10 rounded-3xl self-end' />
				<Skeleton className='w-[15rem] h-10 rounded-3xl self-end' />
				<div className='flex gap-2'>
					<Skeleton className='size-10 rounded-full' />
					<Skeleton className='w-[15rem] h-10 rounded-3xl' />
				</div>
			</main>

			<footer className='p-2 flex gap-3'>
				<Skeleton className='flex-grow h-full rounded-3xl' />
				<Skeleton className='size-12 rounded-full' />
				<Skeleton className='size-12 rounded-full' />
			</footer>
		</MainContentContainer>
	);
}

export function ProfileSectionLoadingScreen() {
	return (
		<MainContentContainer>
			<div className='relative p-3'>
				<Skeleton className='w-full h-[16rem]' />
				<div className='h-16'></div>
				<div className='absolute bottom-3 left-6 !size-[10rem]'>
					<Skeleton className='rounded-full !size-[10rem]' />
				</div>
			</div>

			<div className='px-6 flex justify-between items-start'>
				<div>
					<Skeleton className='w-[10rem] h-8 mb-2' />
					<Skeleton className='w-[5rem] h-6 mb-6' />
					<Skeleton className='w-[15rem] h-6' />
				</div>
				<Skeleton className='w-[7rem] h-10' />
			</div>
		</MainContentContainer>
	);
}

export function ProfileEditLoadingScreen() {
	return (
		<MainContentContainer>
			<div className='p-3'>
				{/* profile picture */}
				<div className='border-b border-dark-400 p-3'>
					<div className='flex justify-between'>
						<Skeleton className='w-[10rem] h-8 mb-2' />
						<div className='relative overflow-hidden'>
							<Skeleton className='w-[7rem] h-9' />
						</div>
					</div>
					<div className='flex justify-center'>
						<Skeleton className='size-[12rem] rounded-full' />
					</div>
				</div>

				{/* other user data */}
				<div className='flex p-3 w-full gap-5 flex-wrap text-dark-500'>
					<div className='flex-1 flex flex-col gap-1'>
						<InputFieldLoading />
						<InputFieldLoading />
						<InputFieldLoading />
					</div>
					<div className='flex-1 flex flex-col text-lg'>
						<Skeleton className='w-[3rem] h-8 mb-2' />
						<Skeleton className='w-full h-full mb-2' />
					</div>
				</div>

				{/* submit button */}
				<div className='p-3 flex justify-end'>
					<Skeleton className='w-[7rem] h-10' />
				</div>
			</div>
		</MainContentContainer>
	);
}

function InputFieldLoading() {
	return (
		<div>
			<Skeleton className='w-[6rem] h-5 mb-1' />
			<Skeleton className='w-full h-9' />
		</div>
	);
}

export function DefaultButtonLoadingSpin() {
	return (
		<div className='flex gap-2'>
			<p>Loading...</p>
			<div role='status'>
				<svg
					aria-hidden='true'
					className='w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
					viewBox='0 0 100 101'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
						fill='currentColor'
					/>
					<path
						d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
						fill='currentFill'
					/>
				</svg>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
}
