import { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';
import styles from './NavBar.module.css';

function Navbar(): JSX.Element {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

	const handleLogout = useCallback(
		async (event: React.MouseEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(logout());
			if (logout.fulfilled.match(dispatchResult)) {
				navigate('/auth/login');
			}
		},
		[dispatch, navigate]
	);
	return (
		<nav>
			{!user ? (
				<div className={styles.linkContainer}>
					<NavLink to="/auth/login">Войти</NavLink>
					<NavLink to="/auth/register">Регистрация</NavLink>
					<NavLink to="/confirm">Подтверждение регистрации</NavLink>
				</div>
			) : location.pathname === '/' ? (
				user.role === 'ADMIN' ? (
					<div className={styles.adminContainer}>
						<NavLink to="/admin/tasks">Задачи всех пользователей</NavLink>
						<NavLink to="/admin/tests">Create test</NavLink>
						<NavLink to="/admin/answers">Answer</NavLink>
					</div>
				) : (
					<NavLink to="/tasks">Задачи текущего пользователя</NavLink>
				)
			) : (
				<NavLink to="/" onClick={handleLogout}>
					На главную
				</NavLink>
			)}
			{user && (
				<NavLink to="" onClick={handleLogout}>
					Выйти
				</NavLink>
			)}
		</nav>
	);
}

export default Navbar;
