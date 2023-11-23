import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';
import styles from './NavBar.module.css';
import ProgressBar from '../user_tests/ProgressBar';

function Navbar(): JSX.Element {
	const dispatch = useAppDispatch();
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

	const [showProgressBar, setShowProgressBar] = useState(false);

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
					<NavLink
						className={styles.nav_link_lower_advent}
						to="/advent_calender"
					>
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
						</div>
					</div>
				)}

				{isLoggedIn && !isAdmin && (
					<div>
						<div
							className={styles.nav_link_lower}
							onMouseEnter={() => setShowProgressBar(true)}
							onMouseLeave={() => setShowProgressBar(false)}
						>
							Progress Bar
							{showProgressBar && (
								<div className={styles.progressBarContainer}>
									<ProgressBar />
								</div>
							)}
						</div>
						<NavLink
							to="/user/results"
							className={styles.nav_link_lower}
							onClick={(e) => e.preventDefault()} // Предотвращение навигации
						>
							My Results
						</NavLink>
						<NavLink
							to="/user/rank"
							className={styles.nav_link_lower}
							onClick={(e) => e.preventDefault()} // Предотвращение навигации
						>
							See the rank
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
