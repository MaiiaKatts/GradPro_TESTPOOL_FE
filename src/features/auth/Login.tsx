/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginFormError } from './selectors';
import { getUser, login, resetLoginFormError } from './authSlice';
import styles from './Login.module.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Login(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(selectLoginFormError);
	const { user } = useAppSelector((state) => state.auth);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(
				login({
					email,
					password,
				})
			);
			// проверяем, что санк login зарезолвился успешно
			if (login.fulfilled.match(dispatchResult)) {
				dispatch(getUser()); // подгрузит юзера
				console.log('User', user);
				navigate('/user'); // переведет на стартовую страницу
			}

			// выводим в консоль ошибку если санк login зареджектился
			if (login.rejected.match(dispatchResult)) {
				console.error(dispatchResult.error.message);
			}
		},
		[dispatch, email, navigate, password]
	);

	const handleEmailChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(event.target.value);
			dispatch(resetLoginFormError());
		},
		[dispatch]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(event.target.value);
			dispatch(resetLoginFormError());
		},
		[dispatch]
	);

	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};

	return (
		<div className={styles.containerHome}>
			<div className={styles.container}>
				<div className={styles.pin_container}></div>
				<div className={styles.form_container}>
					<form onSubmit={handleSubmit}>
						<h2 className="text-center mb-4">Login</h2>
						{error && (
							<div className="alert alert-danger" role="alert">
								{error}
							</div>
						)}
						<div className={styles.inputGroup}>
							<label htmlFor="email-input" className="form-label">
								Email
							</label>
							<input
								type="text"
								className={`form-control ${error ? 'is-invalid' : ''}`}
								id="email-input"
								name="email"
								value={email}
								onChange={handleEmailChange}
								required
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="password-input" className="form-label">
								Password
							</label>
							<div className={styles.passwordInputContainer}>
								<input
									type={passwordShown ? 'text' : 'password'}
									className={`form-control ${error ? 'is-invalid' : ''}`}
									id="password-input"
									name="password"
									value={password}
									onChange={handlePasswordChange}
									required
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

						<div className={styles.submitButtonContainer}>
							<button
								type="submit"
								aria-label="Login"
								className={styles.submitButton}
							></button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
