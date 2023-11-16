/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styles from './TestFE.module.css';
import { useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { loadAllAnswers } from '../../features/answers/answerSlice';
import { loadRandomQuestions } from '../../features/questions/questionsSlice';

export default function TestFE(): JSX.Element {
	const dispatch = useAppDispatch();

	const handleTestSelect = (testId: number) => {
		dispatch(loadRandomQuestions(testId));
		dispatch(loadAllAnswers());
	};

	return (
		<div className={styles.containerHome}>
			<div>Test FE</div>
			<Link to="/testFE/20" onClick={() => handleTestSelect(20)}>
				Frontend Junior
			</Link>
			<Link to="/testFE/26" onClick={() => handleTestSelect(26)}>
				Frontend Middle
			</Link>
			<Link to="/testFE/30" onClick={() => handleTestSelect(30)}>
				Frontend Middle Plus
			</Link>
		</div>
	);
}
