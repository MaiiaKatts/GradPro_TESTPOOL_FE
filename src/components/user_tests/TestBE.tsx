/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/default */
import styles from './TestBE.module.css';
import { useAppDispatch } from '../../app/hooks';
import { loadRandomQuestions } from '../../features/questions/questionsSlice';
import { Link } from 'react-router-dom';

export default function TestBE(): JSX.Element {
	const dispatch = useAppDispatch();

	const handleTestSelect = (testId: number) => {
		dispatch(loadRandomQuestions(testId));
	};

	return (
		<div className={styles.containerHome}>
			<div>Test BE</div>
			<Link to="/testBE/21" onClick={() => handleTestSelect(21)}>
				Backend Junior
			</Link>
			<Link to="/testBE/27" onClick={() => handleTestSelect(27)}>
				Backend Middle
			</Link>
			<Link to="/testBE/29" onClick={() => handleTestSelect(29)}>
				Backend Middle Plus
			</Link>
		</div>
	);
}
