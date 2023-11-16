/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loadAllAnswers } from '../../features/answers/answerSlice';
import { loadRandomQuestions } from '../../features/questions/questionsSlice';
import styles from './TestQA.module.css';

export default function TestQA(): JSX.Element {
	const dispatch = useAppDispatch();

	const handleTestSelect = (testId: number) => {
		dispatch(loadRandomQuestions(testId));
		dispatch(loadAllAnswers());
	};

	return (
		<div className={styles.containerHome}>
			<div>Test QA</div>
			<Link to="/testQA/25" onClick={() => handleTestSelect(25)}>
				QA Junior
			</Link>
			<Link to="/testBE/28" onClick={() => handleTestSelect(28)}>
				QA Middle
			</Link>
			<Link to="/testBE/31" onClick={() => handleTestSelect(31)}>
				QA Middle Plus
			</Link>
		</div>
	);
}
