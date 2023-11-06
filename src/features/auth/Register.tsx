/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useState } from 'react';
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
	const showErrorPassword = useAppSelector((state) => state.modal.showPasswordRequirementsModal);
	const showExistedUser = useAppSelector((state) => state.modal.showExistedUserModal);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const showConfirmation = useAppSelector((state) => state.modal.showConfirmationModal);
	const [passwordIsValid, setPasswordIsValid] = useState(true);

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!passwordIsValid) {
				dispatch(showPasswordRequirementsModal());
				return;
			}

			const response: any = await dispatch(
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
		[dispatch, firstName, lastName, email, password, passwordRepeat, passwordIsValid, register]
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
				newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[!@#$%^&+=]/.test(newPassword);
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
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Registration</h2>
			{error && (
				<div className="invalid-feedback mb-3" style={{ display: 'block' }}>
					{error}
				</div>
			)}
			<div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					First Name
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="firstName-input"
					name="username"
					value={firstName}
					onChange={handleFirstNameChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					Last Name
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="lastName-input"
					name="username"
					value={lastName}
					onChange={handleLastNameChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					Email
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="name-input"
					name="username"
					value={email}
					onChange={handleNameChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password-input" className="form-label">
					Password
				</label>
				<input
					type="password"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="password-input"
					name="password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password-repeat-input" className="form-label">
					Repeat password
				</label>
				<input
					type="password"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="password-repeat-input"
					name="passwordRepeat"
					value={passwordRepeat}
					onChange={handlePasswordRepeatChange}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Register
			</button>
			<Modal
				isOpen={showConfirmation}
				onRequestClose={handleModalClose}
				contentLabel="Confirmation Modal"
				ariaHideApp={false}
			>
				<h2>Registration Successful</h2>
				<p>Please check your email.</p>
				<button onClick={handleModalClose}>Close</button>
			</Modal>
			<Modal
				isOpen={showErrorPassword}
				onRequestClose={handleModalClose}
				contentLabel="Password Requirements Modal"
				ariaHideApp={false}
			>
				<h2>Password Requirements</h2>
				<p>
					Password must be at least 8 characters long and contain at least one capital letter and
					one symbol (@#$%^&+=!).
				</p>
				<button onClick={handleModalClose}>Close</button>
			</Modal>
			<Modal
				isOpen={showExistedUser}
				onRequestClose={() => dispatch(hideExistedUserModal())}
				contentLabel="Existing User Modal"
				ariaHideApp={false}
			>
				<h2>User Already Exists</h2>
				<p>An account with this email already exists.</p>
				<button onClick={handleModalClose}>Close</button>
			</Modal>
		</form>
	);
}
export default Register;
