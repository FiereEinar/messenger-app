/* eslint-disable react/prop-types */
export function InputField({
	id,
	label,
	type,
	error,
	register,
	labelClass,
	...rest
}) {
	return (
		<div className='flex-1 flex flex-col '>
			<label className={labelClass} htmlFor={id}>
				{label}
			</label>
			<input
				autoComplete='true'
				{...register}
				{...rest}
				id={id}
				className='rounded-sm p-1 px-2 bg-dark-200 text-lg'
				type={type}
			/>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
}
