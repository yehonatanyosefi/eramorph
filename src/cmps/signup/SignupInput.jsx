import { SvgIcon } from '../util/SvgIcon'
const EMAIL_REGEX = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
export default function SignupInput({
	inputField,
	credentials,
	errors,
	isFloating,
	handleChange,
	handleFocus,
	handleBlur,
	togglePassVisibility,
}) {
	let { type, placeholder, name, hasBeenChecked, isVisible } = inputField
	let errorClass = hasBeenChecked ? (errors[name] ? 'error' : 'success') : ''
	type = type === 'password' && isVisible ? 'text' : type
	return (
		<div className={`input-wrapper`}>
			<input
				id={name}
				className={errorClass}
				type={type}
				placeholder={isFloating ? '' : placeholder}
				aria-label={`Enter your ${placeholder}`}
				name={name}
				value={credentials[name]}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				aria-required="true"
				aria-invalid={!!errors[name]}
				required
				pattern={name === 'emailAddress' ? EMAIL_REGEX : '.*'}
			/>
			<label htmlFor={name} className={isFloating ? '' : 'hidden'}>
				{placeholder}
			</label>
			{hasBeenChecked && (
				<SvgIcon
					iconName={errorClass}
					className={`${errorClass} ${errorClass === 'error' ? '' : 'hide-icon'}`}
				/>
			)}
			{errors[name] && (
				<div className="error-msg" role="alert">
					{errors[name]}
				</div>
			)}
			{(type === 'password' || isVisible) && (
				<SvgIcon
					iconName={isVisible ? 'eye-off' : 'eye'}
					className={`toggle-eye`}
					onClick={() => togglePassVisibility(name)}
				/>
			)}
		</div>
	)
}
