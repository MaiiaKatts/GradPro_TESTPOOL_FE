import { useCallback, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';
import styles from './NavBar.module.css';

function Navbar(): JSX.Element {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

	const isLoggedIn = user != null;
	const isAdmin = user?.role === 'ADMIN';

	useEffect(() => {
		console.log('Is logged in:', isLoggedIn);
		console.log('Is admin:', isAdmin);
	}, [isLoggedIn, isAdmin]);

	const handleLogout = useCallback(
		async (event: React.MouseEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(logout());
			if (logout.fulfilled.match(dispatchResult)) {
				navigate('/');
			}
		},
		[dispatch, navigate]
	);

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar_upper}>
				<Link
					to={isLoggedIn ? (isAdmin ? '/admin_test' : '/user') : '/'}
					className={styles.logoLink}
				>
					<div className={styles.logo}></div>
				</Link>

				{!isLoggedIn && (
					<div className={styles.nav_links}>
						<NavLink className={styles.nav_link} to="/auth/login">
							Login
						</NavLink>
						<NavLink className={styles.nav_link} to="/auth/register">
							Register
						</NavLink>
					</div>
				)}

				{isLoggedIn && (
					<div className={styles.nav_links}>
						<a href="#" className={styles.nav_link} onClick={handleLogout}>
							Log out
						</a>
					</div>
				)}
			</div>

			<div className={styles.navbar_lower}>
				<div className={styles.leftLinks}>
					<NavLink className={styles.nav_link_lower_advent} to="/advent_calender">
						Advent Calender
					</NavLink>
				</div>

				{isAdmin && (
					<div className={styles.adminContainer}>
						<div>
							{/*<NavLink to="/admin/tasks" className={styles.nav_link_lower}></NavLink>*/}
							<NavLink to="/admin_test" className={styles.nav_link_lower}>
								Admin Cabinet
							</NavLink>
							<NavLink to="/admin/questions" className={styles.nav_link_lower}>
								Create question
							</NavLink>
							<NavLink to="/admin/answers" className={styles.nav_link_lower}>
								Create answers
							</NavLink>
							<NavLink to="/admin/tests" className={styles.nav_link_lower}>
								Create test
							</NavLink>
							<NavLink
								to="/admin/questionsList"
								className={styles.nav_link_lower}
							>
								Questions List
							</NavLink>

							{/*<NavLink to="/tasks">Задачи текущего пользователя</NavLink>*/}
							{/*<NavLink to="/questions" className={styles.nav_link_lower}>
								Вопросы
							</NavLink>
							<NavLink to="/answers" className={styles.nav_link_lower}>
								Ответы
				</NavLink>*/}
						</div>
					</div>
				)}

				{isLoggedIn && !isAdmin && (
					<div>
						<NavLink to="/user/progress" className={styles.nav_link_lower}>
							Progress Bar
						</NavLink>
						<NavLink to="/user/results" className={styles.nav_link_lower}>
							My Results
						</NavLink>
						<NavLink to="/user/rank" className={styles.nav_link_lower}>
							See the rank
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
