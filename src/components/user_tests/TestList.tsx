import { useEffect, useState } from 'react';
import styles from './TestList.module.css';
import { NavLink, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';

interface Term {
	id: number;
	category: string;
	term: string;
	definition: string;
}

const techTerms: Term[] = [
	{
		id: 1,
		category: 'Backend',
		term: 'REST API',
		definition:
			'An architectural style for networked applications, based on stateless, client-server communication.',
	},
	{
		id: 2,
		category: 'Frontend',
		term: 'React Hooks',
		definition:
			'Functions that let you hook into React state and lifecycle features from function components.',
	},
	{
		id: 3,
		category: 'Testing',
		term: 'End-to-End Testing',
		definition:
			"A testing method that involves testing an application's workflow from beginning to end.",
	},
];
export default function TestList(): JSX.Element {
	const [currentTermIndex, setCurrentTermIndex] = useState<number>(0);
	const user = useAppSelector(selectUser);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTermIndex((prevIndex) => (prevIndex + 1) % techTerms.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const currentTerm = techTerms[currentTermIndex];
	console.log('user', user);
	if (user?.role === 'ADMIN') {
		return <Navigate to="/admin_test" />;
	}
	return (
		<div className={styles.containerHome}>
			<div className={styles.mainContainer}>
				<div className={styles.leftContainer}>
					<div className={styles.testLinks}>
						<NavLink to="/" className={styles.testLink_BE}></NavLink>
						<NavLink to="/" className={styles.testLink_FE}></NavLink>
						<NavLink to="/" className={styles.testLink_QA}></NavLink>
					</div>
				</div>
				<div className={styles.middleContainer}>
					<div className={styles.textContent}>
						<h4>Unlock Your Potential – Start Today!</h4>
						<p>
							Dive into our thorough Backend, Frontend, and QA tests to evaluate your skills and
							find areas to improve. Engage with 10 strategic questions from a pool of 100+,
							covering various topics. Each question offers four potential answers and includes a
							detailed explanation to enhance your understanding. Learn and test yourself in a
							dynamic way.
						</p>
						<p>
							After completing the test, your score in points is instantly available. You can track
							your performance against past results, see your growth, and spot learning trends on
							your personal dashboard. It’s an effective tool to observe your progress and plan your
							learning journey.
						</p>
						<p>
							Leverage our quizzes to boost your professional knowledge. Each attempt is a step
							forward in your career journey, empowering you to reach higher professional
							milestones. This condensed version maintains the essence of the process and the
							continuous learning encouragement while being more succinct.
						</p>
					</div>
				</div>
				<div className={styles.rightContainer}>
					<div>
						<h4>Term of the Moment</h4>
						{currentTerm && (
							<div>
								<h5>{currentTerm.term}</h5>
								<div className={styles.textContent_news}>
									<p>{currentTerm.definition}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
