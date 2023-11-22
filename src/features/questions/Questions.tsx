/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	selectError,
	selectQuestions,
	selectRandomQuestions,
} from './selectors';
import Question, { QuestionId } from './types/Question';
import {
	createQuestion,
	deleteQuestion,
	loadQuestions,
	loadRandomQuestions,
	resetError,
	updateQuestion,
} from './questionsSlice';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../auth/selectors';
import styles from './Questions.module.css';

export default function Questions(): JSX.Element {
	const questions = useAppSelector(selectQuestions);
	const randomQuestions = useAppSelector(selectRandomQuestions);
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectError);
	const [testId, setTestId] = useState<number>(0);
	const [question, setQuestion] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [editTestId, setEditTestId] = useState<number>(0);
	const [editQuestion, setEditQuestion] = useState<string>('');

	useEffect(() => {
		dispatch(loadQuestions());
	}, [dispatch]);

	useEffect(() => {
		if (testId) {
			dispatch(loadRandomQuestions(testId));
		}
	}, [dispatch, testId]);

	const handleRandomQuestionsSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			dispatch(loadRandomQuestions(testId));
		},
		[dispatch, testId]
	);

	const handleQuestionRemove = useCallback(
		(id: QuestionId) => {
			dispatch(deleteQuestion({ testId, id }));
		},
		[dispatch]
	);

	const startEditing = useCallback((question: Question) => {
		setIsEditing(true);
		setCurrentQuestion(question);
		setEditTestId(question.testId);
		setEditQuestion(question.question);
	}, []);

	const handleCreateQuestion = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const dispatchResult = await dispatch(
				createQuestion({ testId, question })
			);
			if (createQuestion.fulfilled.match(dispatchResult)) {
				setTestId(0);
				setQuestion('');
			} else if (createQuestion.rejected.match(dispatchResult)) {
				dispatch(resetError());
			}
		},
		[dispatch, testId, question, resetError]
	);

	const handleUpdateQuestion = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (currentQuestion && editTestId) {
				const dispatchResult = await dispatch(
					updateQuestion({
						testId: editTestId,
						question: {
							...currentQuestion,
							question: editQuestion,
						},
					})
				);
				if (updateQuestion.fulfilled.match(dispatchResult)) {
					setIsEditing(false);
					setCurrentQuestion(null);
					setEditTestId(0);
					setEditQuestion('');
				} else if (updateQuestion.rejected.match(dispatchResult)) {
					dispatch(resetError());
				}
			}
		},
		[
			dispatch,
			editTestId,
			editQuestion,
			currentQuestion,
			setIsEditing,
			resetError,
		]
	);
	const user = useAppSelector(selectUser);
	// user // - что есть такой юзер
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	//user && user.role === 'ADMIN'; // - есть юзер и он админ
	// user && user.role === 'USER'  // - есть юзер и он пользователь по роли
	if (!user?.email) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={styles.containerHome}>
			<div className={styles.mainContainer}>
				<div className={styles.testHeading}>Create questions</div>
				<p className={styles.random}>Get random questions</p>
				<form className={styles.form} onSubmit={handleRandomQuestionsSubmit}>
					<div className={styles.inputGroup}>
						<input
							type="number"
							className={styles.formControl}
							placeholder="Enter Test ID to get random questions..."
							value={testId}
							onChange={(e) => {
								const parsedValue = parseInt(e.target.value, 10);
								setTestId(isNaN(parsedValue) ? 0 : parsedValue);
							}}
						/>
						<button type="submit" className={styles.btn}>
							Load Random Questions
						</button>
					</div>
				</form>
				<div>
					{randomQuestions.length > 0 ? (
						<ul>
							{randomQuestions.map((question) => (
								<li key={question.id}>{question.question}</li>
							))}
						</ul>
					) : (
						<div>No random questions available.</div>
					)}
				</div>
				<p className={styles.addQuestion}>Add question</p>
				<form className={styles.form} onSubmit={handleCreateQuestion}>
					<div className={styles.inputGroup}>
						<div className={styles.inputRow}>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Test ID..."
								aria-label="Test ID..."
								name="test ID"
								value={testId}
								onChange={(e) => {
									const parsedValue = parseInt(e.target.value, 10);
									setTestId(isNaN(parsedValue) ? 0 : parsedValue);
								}}
							/>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Type your question..."
								aria-label="Type your question..."
								name="question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
							/>
						</div>
						<button type="submit" className={styles.btn}>
							Add
						</button>
					</div>
					{error && (
						<div className={`${styles.invalidFeedback} ${styles.displayBlock}`}>
							{error}
						</div>
					)}
				</form>
				{isEditing && (
					<form className={styles.form} onSubmit={handleUpdateQuestion}>
						<div className={styles.inputGroup}>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Test ID..."
								aria-label="Test ID..."
								name="testId"
								value={editTestId}
								onChange={(e) => {
									const parsedValue = parseInt(e.target.value, 10);
									setEditTestId(isNaN(parsedValue) ? 0 : parsedValue);
								}}
							/>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Type your question..."
								aria-label="Type your question..."
								name="question"
								value={editQuestion}
								onChange={(e) => setEditQuestion(e.target.value)}
							/>
							<button type="submit" className={styles.btn}>
								{isEditing ? 'Update' : 'Add'}
							</button>
						</div>
					</form>
				)}
				<ul>
					<div>
						{questions?.map((question) => (
							<li key={question.id} className={styles.questionItem}>
								<div className={styles.questionContent}>
									{question.testId}
									{' ' + question.question + ' '}
								</div>
								<div className={styles.questionsActions}>
									<span
										className={`${styles.badge} ${styles.bgPrimary} ${styles.roundedPill} ${styles.editTest}`}
										role="button"
										onClick={() => startEditing(question)}
										tabIndex={0}
									>
										Edit
									</span>
									<span
										className={`${styles.badge} ${styles.bgDanger} ${styles.roundedPill} ${styles.removeTest}`}
										role="button"
										onClick={() => handleQuestionRemove(question.id)}
										tabIndex={0}
									>
										Delete
									</span>
								</div>
							</li>
						))}
					</div>
				</ul>
			</div>
		</div>
	);
}
