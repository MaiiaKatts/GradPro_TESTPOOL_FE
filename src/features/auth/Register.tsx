/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useState } from 'react';
import styles from './Register.module.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

//import { useNavigate } from 'react-router-dom';
import { register, resetRegisterFormError, login } from './authSlice';
import { selectRegisterFormError } from './selectors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	showConfirmationModal,
	hideConfirmationModal,
	showPasswordRequirementsModal,
	hidePasswordRequirementsModal,
	showExistedUserModal,
	hideExistedUserModal,
} from './modalSlice';
// eslint-disable-next-line import/no-unresolved
import Modal from 'react-modal';
// eslint-disable-next-line import/no-unresolved

function Register(): JSX.Element {
	const dispatch = useAppDispatch();
	//const navigate = useNavigate();
	const error = useAppSelector(selectRegisterFormError);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');

	const [passwordShown, setPasswordShown] = useState(false);
	const [passwordRepeatShown, setPasswordRepeatShown] = useState(false);

	const showErrorPassword = useAppSelector(
		(state) => state.modal.showPasswordRequirementsModal
	);
	const showExistedUser = useAppSelector(
		(state) => state.modal.showExistedUserModal
	);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const showConfirmation = useAppSelector(
		(state) => state.modal.showConfirmationModal
	);
	const [passwordIsValid, setPasswordIsValid] = useState(true);

	const [isAgreed, setIsAgreed] = useState(false);
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setAttemptedSubmit(true);

			if (!passwordIsValid) {
				dispatch(showPasswordRequirementsModal());
				return;
			}
			if (!isAgreed) {
				return;
			}

			const response = await dispatch(
				register({
					firstName,
					lastName,
					email,
					password,
					passwordRepeat,
				})
			);

			if (response && response.type === register.fulfilled.type) {
				if (response.payload && 'message' in response.payload) {
					if (
						response.payload.message.includes('409') ||
						response.payload.message.includes('already exists')
					) {
						dispatch(showExistedUserModal());
					} else {
						dispatch(showPasswordRequirementsModal());
					}
				} else {
					dispatch(login({ email, password }));
					dispatch(showConfirmationModal());
				}
			}
		},
		[
			dispatch,
			firstName,
			lastName,
			email,
			password,
			passwordRepeat,
			passwordIsValid,
			isAgreed,
		]
	);
	const handleFirstNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFirstName(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handleLastNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLastName(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handleNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newPassword = event.target.value;
			setPassword(event.target.value);
			dispatch(resetRegisterFormError());

			const isValid =
				newPassword.length >= 8 &&
				/[A-Z]/.test(newPassword) &&
				/[!@#$%^&+=]/.test(newPassword);
			setPasswordIsValid(isValid);
		},
		[dispatch]
	);

	const handlePasswordRepeatChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPasswordRepeat(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};

	const togglePasswordRepeatVisibility = () => {
		setPasswordRepeatShown(!passwordRepeatShown);
	};
	const handleModalClose = useCallback(() => {
		dispatch(hideConfirmationModal());
		dispatch(hidePasswordRequirementsModal());
		dispatch(hideExistedUserModal());
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setPasswordRepeat('');
	}, [dispatch]);

	return (
		<div className={styles.containerHome}>
			<div className={styles.container}>
				<form className={styles.authForm} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Registration</h2>
					{error && <div className={styles.errorFeedback}>{error}</div>}
					<div className={styles.inputGroup}>
						<label htmlFor="firstName-input" className={styles.formLabel}>
							First Name*
						</label>
						<input
							type="text"
							className={`${styles.inputField} ${
								error ? styles.inputInvalid : ''
							}`}
							id="firstName-input"
							name="firstName"
							value={firstName}
							onChange={handleFirstNameChange}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="lastName-input" className={styles.formLabel}>
							Last Name*
						</label>
						<input
							type="text"
							className={`${styles.inputField} ${
								error ? styles.inputInvalid : ''
							}`}
							id="lastName-input"
							name="lastName"
							value={lastName}
							onChange={handleLastNameChange}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="email-input" className={styles.formLabel}>
							Email*
						</label>
						<input
							type="email"
							className={`${styles.inputField} ${
								error ? styles.inputInvalid : ''
							}`}
							id="email-input"
							name="email"
							value={email}
							onChange={handleNameChange}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password-input" className={styles.formLabel}>
							Password*
						</label>
						<div className={styles.passwordInputContainer}>
							<input
								type={passwordShown ? 'text' : 'password'}
								className={`${styles.inputField} ${
									error ? styles.inputInvalid : ''
								}`}
								id="password-input"
								name="password"
								value={password}
								onChange={handlePasswordChange}
							/>
							{passwordShown ? (
								<VisibilityIcon
									onClick={togglePasswordVisibility}
									className={styles.eyeIcon}
								/>
							) : (
								<VisibilityOffIcon
									onClick={togglePasswordVisibility}
									className={styles.eyeIcon}
								/>
							)}
						</div>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password-repeat-input" className={styles.formLabel}>
							Confirm password*
						</label>
						<div className={styles.passwordInputContainer}>
							<input
								type={passwordRepeatShown ? 'text' : 'password'}
								className={`${styles.inputField} ${
									error ? styles.inputInvalid : ''
								}`}
								id="password-repeat-input"
								name="passwordRepeat"
								value={passwordRepeat}
								onChange={handlePasswordRepeatChange}
							/>
							{passwordRepeatShown ? (
								<VisibilityIcon
									onClick={togglePasswordRepeatVisibility}
									className={styles.eyeIcon}
								/>
							) : (
								<VisibilityOffIcon
									onClick={togglePasswordRepeatVisibility}
									className={styles.eyeIcon}
								/>
							)}
						</div>
					</div>
					<div className={styles.inputGroup}>
						<div></div>
						<label htmlFor="terms-checkbox" className={styles.checkboxLabel}>
							<input
								type="checkbox"
								id="terms-checkbox"
								checked={isAgreed}
								onChange={(e) => {
									setIsAgreed(e.target.checked);
									setAttemptedSubmit(false);
								}}
							/>
							<div>I agree to the Terms and Conditions</div>
						</label>
						{attemptedSubmit && !isAgreed && (
							<div className={styles.error}>
								You must agree to the terms and conditions before registering.
							</div>
						)}
					</div>

					<div className={styles.submitButtonContainer}>
						<button
							type="submit"
							aria-label="Register"
							className={styles.submitButton}
							disabled={!isAgreed}
						></button>
					</div>
				</form>

				<Modal
					isOpen={showConfirmation}
					onRequestClose={handleModalClose}
					className={styles.modalContent}
					overlayClassName={styles.modalOverlay}
					ariaHideApp={false}
				>
					<h2>Registration Successful</h2>
					<p>Please check your email.</p>
					<button
						onClick={handleModalClose}
						className={styles.modalCloseButton}
					>
						Close
					</button>
				</Modal>

				<Modal
					isOpen={showErrorPassword}
					onRequestClose={handleModalClose}
					className={styles.modalContent}
					overlayClassName={styles.modalOverlay}
					ariaHideApp={false}
				>
					<h2>Password Requirements</h2>
					<p>
						Password must be at least 8 characters long and contain at least one
						uppercase letter and one symbol (@#$%^&+=!).
					</p>
					<button
						onClick={handleModalClose}
						className={styles.modalCloseButton}
					>
						Close
					</button>
				</Modal>

				<Modal
					isOpen={showExistedUser}
					onRequestClose={handleModalClose}
					className={styles.modalContent}
					overlayClassName={styles.modalOverlay}
					ariaHideApp={false}
				>
					<h2>User Already Exists</h2>
					<p>An account with this email already exists.</p>
					<button
						onClick={handleModalClose}
						className={styles.modalCloseButton}
					>
						Close
					</button>
				</Modal>
			</div>
		</div>
	);
}

export default Register;
