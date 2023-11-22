/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	createAnswer,
	loadAllAnswers,
	removeAnswer,
	updateAnswerDetails,
} from './answersSlice';
import { selectAnswers } from './selector';
import Answer from './types/answer';
import styles from './AnswerList.module.css';
import { selectQuestions } from '../questions/selectors';
import { loadQuestions } from '../questions/questionsSlice';
import { selectTests } from '../tests/selectors';
export default function AnswerList(): JSX.Element {
	const dispatch = useAppDispatch();
	const answers = useAppSelector(selectAnswers);
	const questions = useAppSelector(selectQuestions);
	const tests = useAppSelector(selectTests);
	const [newAnswer, setNewAnswer] = useState<Answer>({
		id: 0,
		answer: '',
		correct: false,
		questionId: 0,
	});

	useEffect(() => {
		dispatch(loadAllAnswers());
		dispatch(loadQuestions());
	}, [dispatch]);

	const handleCreateAnswer = useCallback(() => {
		if (newAnswer.questionId && newAnswer.answer.trim()) {
			dispatch(
				createAnswer({
					questionId: newAnswer.questionId,
					answer: newAnswer.answer,
					correct: newAnswer.correct,
				})
			);
			setNewAnswer({ id: 0, questionId: 0, answer: '', correct: false });
		} else {
			console.error('Please fill in all fields');
		}
	}, [dispatch, newAnswer]);

	const handleUpdateAnswer = (answer: Answer): void => {
		if (answer.id && answer.questionId) {
			dispatch(
				updateAnswerDetails({
					id: answer.id,
					questionId: answer.questionId,
					answer: answer.answer,
					correct: answer.correct,
				})
			);
		}
	};

	const handleRemoveAnswer = (answer: Answer): void => {
		if (answer.id && answer.questionId) {
			dispatch(removeAnswer({ questionId: answer.questionId, id: answer.id }));
		}
	};

	return (
		<div className={styles.containerHome}>
			<div className={styles.container}>
				<h1 className={styles.testHeading}>Create answers</h1>
				<div className={styles.h1container}>All answers</div>
				<div className={styles['table-container']}>
					<table>
						<thead>
							<tr>
								<th>Answer</th>
								<th>Is Correct</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{answers.map((answer) => (
								<tr key={answer.id}>
									<td>{answer.answer}</td>
									<td>{answer.correct ? 'Yes' : 'No'}</td>
									<td>
										<div>
											<button
												type="button"
												onClick={() => handleUpdateAnswer(answer)}
												className={styles.button}
											>
												Update
											</button>
											<button
												onClick={() => handleRemoveAnswer(answer)}
												className={styles.button}
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className={styles.h1container}>Add new answer</div>
				<div className={styles['new-answer-container']}>
					<input
						type="text"
						value={newAnswer.answer}
						onChange={(e) =>
							setNewAnswer({ ...newAnswer, answer: e.target.value })
						}
						placeholder="New answer text"
						className={styles.input}
					/>
					<label className={styles.checkboxContainer}>
						<input
							type="checkbox"
							checked={newAnswer.correct}
							onChange={(e) =>
								setNewAnswer({ ...newAnswer, correct: e.target.checked })
							}
						/>
						Is correct?
					</label>
					{
						<select
							value={newAnswer.questionId}
							onChange={(e) => {
								const questionId = Number(e.target.value);
								const selectedQuestion = questions.find(
									(q) => q.id === questionId
								);
								if (!selectedQuestion) {
									console.error('Selected question not found');
									return;
								}
								console.log(
									"Selected question's testId:",
									selectedQuestion.testId
								);
								console.log('Available tests:', tests);
								const test = tests.find(
									(t) => t.id === selectedQuestion.testId
								);
								if (!test) {
									console.error('Test not found for the selected question');
									return;
								}
								setNewAnswer({
									...newAnswer,
									questionId,
									question: selectedQuestion.question,
									difficultyLevel: test.level,
								});
							}}
							className={styles.dropdown}
						>
							<option value="">Select Question</option>
							{questions.map((question) => (
								<option key={question.id} value={question.id}>
									{question.question} (
									{tests.find((t) => t.id === question.testId)?.level ||
										'Unknown Level'}
									)
								</option>
							))}
						</select>
					}
					<button
						type="button"
						onClick={handleCreateAnswer}
						className={styles.answerButton}
					>
						Add Answer
					</button>
				</div>
			</div>
		</div>
	);
}
