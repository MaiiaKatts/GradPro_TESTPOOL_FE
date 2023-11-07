import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createAnswer, loadAllAnswers, removeAnswer, updateAnswerDetails } from './answerSlice';
import { selectAnswers } from './selector';
import Answer from './types/answer';
import styles from './AnswerList.module.css';
export default function AnswerList(): JSX.Element {
	const dispatch = useAppDispatch();
	const answers = useAppSelector(selectAnswers);
	//const questions = useAppSelector(selectQuestions);
	const [newAnswer, setNewAnswer] = useState<Answer>({
		answer: '',
		is_correct: false,
		questionId: 0,
	});

	useEffect(() => {
		dispatch(loadAllAnswers());
		//dispatch(loadAllQuestions());
	}, [dispatch]);

	const handleCreateAnswer = (): void => {
		if (newAnswer.answer.trim() && newAnswer.questionId) {
			//	const question = questions.find(q => q.id === newAnswer.questionId);
			// const test = tests.find(t => t.id === question.testId);

			dispatch(
				createAnswer({
					...newAnswer,
					isCorrect: newAnswer.is_correct,
					//questionText: question.question,
					//difficultyLevel: test.level,
				})
			);
			setNewAnswer({
				...newAnswer,
				answer: '',
				is_correct: false,
				//questionId: 0,
			});
		}
	};

	const handleUpdateAnswer = (answer: Answer): void => {
		if (answer.id && answer.questionId) {
			dispatch(
				updateAnswerDetails({
					answerId: answer.id,
					questionId: answer.questionId,
					answer: answer.answer,
					isCorrect: answer.is_correct,
				})
			);
		}
	};

	const handleRemoveAnswer = (answer: Answer): void => {
		if (answer.id && answer.questionId) {
			dispatch(removeAnswer({ questionId: answer.questionId, answerId: answer.id }));
		}
	};

	return (
		<div className={styles.backgroundWrapper}>
			<div className={styles.container}>
				<h1>All answers</h1>
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
									<td>{answer.is_correct ? 'Yes' : 'No'}</td>
									<td>
										<div>
											<button
												type="button"
												onClick={() => handleUpdateAnswer(answer)}
												className={styles.button}
											>
												Update
											</button>
											<button onClick={() => handleRemoveAnswer(answer)} className={styles.button}>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<h3>Add new answer</h3>
				<div className={styles['new-answer-container']}>
					<input
						type="text"
						value={newAnswer.answer}
						onChange={(e) => setNewAnswer({ ...newAnswer, answer: e.target.value })}
						placeholder="New answer text"
						className={styles.input}
					/>
					<label className={styles.checkboxContainer}>
						<input
							type="checkbox"
							checked={newAnswer.is_correct}
							onChange={(e) => setNewAnswer({ ...newAnswer, is_correct: e.target.checked })}
						/>
						Is correct?
					</label>
					{/*      
					<select
						value={newAnswer.questionId}
						onChange={(e) => {
							const questionId = Number(e.target.value);
							const selectedQuestion = questions.find((q) => q.id === questionId);
							const test = tests.find((t) => t.id === selectedQuestion.testId);
							setNewAnswer({
								...newAnswer,
								questionId: questionId,
								questionText: selectedQuestion.question,
								difficultyLevel: test.level,
							});
						}}
						className={styles.dropdown}
					>
						<option value="">Select Question</option>
						{questions.map((question) => (
							<option key={question.id} value={question.id}>
								{question.title} ({tests.find((t) => t.id === question.testId).level})
							</option>
						))}
					</select>
*/}
					<button type="button" onClick={handleCreateAnswer} className={styles.answerButton}>
						Add Answer
					</button>
				</div>
			</div>
		</div>
	);
}
