/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/export */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { loadQuestions } from './questionsSlice';
import { loadAllAnswers } from '../answers/answersSlice';
import { selectQuestions } from './selectors';
import { selectAnswers } from '../answers/selector';
import { TestId } from '../tests/types/Test';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadTests } from '../tests/testsSlice';
import { selectTests } from '../tests/selectors';
import { JSX } from 'react/jsx-runtime';
import AnswerEditForm from '../answers/AnswerEditForm';
import QuestionEditForm from './QuestionEditForm';
import styles from './QuestionList.module.css';

export default function QuestionsList(): JSX.Element {
	const dispatch = useAppDispatch();
	const answers = useAppSelector(selectAnswers);
	const questions = useAppSelector(selectQuestions);
	const tests = useAppSelector(selectTests);
	const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

	useEffect(() => {
		dispatch(loadTests());
		dispatch(loadQuestions());
		dispatch(loadAllAnswers());
	}, [dispatch]);

	const handleTestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedTestId(Number(event.target.value));
	};

	const filteredQuestions = questions.filter(
		(q) => q.testId === selectedTestId
	);
	const filteredAnswers = answers.filter((a) =>
		filteredQuestions.some((q) => q.id === a.questionId)
	);

	return (
		<div className={styles.containerHome}>
			<div className={styles.mainContainer}>
				<div className={styles.testHeading}>Questions List</div>
				<select onChange={handleTestChange}>
					<option value="">Choose test</option>
					{tests.map((test) => (
						<option key={test.id} value={test.id}>
							{test.name} - {test.type} - {test.level}
						</option>
					))}
				</select>
				{filteredQuestions.map((question) => (
					<div key={question.id} className={styles.questionContainer}>
						<h4 className={styles.questionTitle}>{question.question}</h4>
						<div className={styles.inputRow}>
							<QuestionEditForm question={question} />
							{filteredAnswers
								.filter((answer) => answer.questionId === question.id)
								.map((answer) => (
									<div key={answer.id} className={styles.answerBlock}>
										<p>
											{answer.answer} -{' '}
											{answer.correct ? 'Correct' : 'Incorrect'}
										</p>
										<AnswerEditForm answer={answer} />
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
