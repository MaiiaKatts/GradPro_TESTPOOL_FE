/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { createTest, deleteTest, loadTests, resetError, updateTest } from './testsSlice';
=======
import {
	createTest,
	deleteTest,
	loadTests,
	resetError,
	updateTest,
} from './testsSlice';
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTasks } from '../tasks/selectors';
import { loadTasksOfAll } from '../tasks/tasksSlice';
import { TaskId } from '../tasks/types/Task';
import { selectTests, selectError } from './selectors';
import Test, { TestId } from './types/Test';
import Question, { QuestionId } from '../questions/types/Question';
import { selectQuestions, selectRandomQuestions } from '../questions/selectors';
import {
	createQuestion,
	deleteQuestion,
<<<<<<< HEAD
	loadQuestions,
=======
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
	updateQuestion,
} from '../questions/questionsSlice';
import { selectAnswers } from '../answers/selector';
import Answer from '../answers/types/answer';
<<<<<<< HEAD
import { createAnswer, removeAnswer, updateAnswerDetails } from '../answers/answersSlice';
import styles from './CreateTestForm.module.css';
import QuestionsList from '../questions/QuestionsList';
=======
import {
	createAnswer,
	removeAnswer,
	updateAnswerDetails,
} from '../answers/answersSlice';
import QuestionsList from '../questions/QuestionsList';
import styles from './CreateTestForm.module.css';
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c

type QuestionWithAnswers = {
	id: number;
	question: string;
	testId: number;
	answers: Answer[];
};

export default function CreateTestFormSec() {
	const tasks = useAppSelector(selectTasks);
	const dispatch = useAppDispatch();
	const tests = useAppSelector(selectTests);
	const error = useAppSelector(selectError);
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [level, setLevel] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentTest, setCurrentTest] = useState<Test | null>(null);
	const [editName, setEditName] = useState<string>('');
	const [editType, setEditType] = useState<string>('');
	const [editLevel, setEditLevel] = useState<string>('');
	const questions = useAppSelector(selectQuestions);
<<<<<<< HEAD
	const [createdQuestionId, setCreatedQuestionId] = useState<number | null>(null);
	const [createdQuestions, setCreatedQuestions] = useState<QuestionWithAnswers[]>([]);
=======
	const [createdQuestionId, setCreatedQuestionId] = useState<number | null>(
		null
	);
	const [createdQuestions, setCreatedQuestions] = useState<
		QuestionWithAnswers[]
	>([]);
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
	const randomQuestions = useAppSelector(selectRandomQuestions);
	const [testId, setTestId] = useState<number>(0);
	const [question, setQuestion] = useState<string>('');
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [editTestId, setEditTestId] = useState<number>(0);
	const [editQuestion, setEditQuestion] = useState<string>('');
	const [isAddingQuestion, setIsAddingQuestion] = useState(false);
	const answers = useAppSelector(selectAnswers);
	const [answerTexts, setAnswerTexts] = useState(['', '', '', '']);
<<<<<<< HEAD
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
=======
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
		null
	);
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
	const [newAnswer, setNewAnswer] = useState<Answer>({
		answer: '',
		correct: false,
		questionId: 0,
	});
	const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
<<<<<<< HEAD
	const [editingAnswerIndex, setEditingAnswerIndex] = useState<number | null>(null);
=======
	const [editingAnswerIndex, setEditingAnswerIndex] = useState<number | null>(
		null
	);
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c

	useEffect(() => {
		dispatch(loadTests());
	}, [dispatch]);

<<<<<<< HEAD
	useEffect(() => {
		dispatch(loadQuestions());
	}, [dispatch]);

=======
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
	const startAddingQuestion = () => {
		setIsAddingQuestion(true);
	};

	const startEditingQuestion = useCallback((question: Question) => {
		setIsEditing(true);
		setCurrentQuestion(question);
		setEditTestId(question.testId);
		setEditQuestion(question.question);
	}, []);

	const handleCreateQuestion = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (!testId) {
				console.error('Test ID is not set.');
				return;
			}
<<<<<<< HEAD
			const dispatchResult = await dispatch(createQuestion({ testId, question }));
=======
			const dispatchResult = await dispatch(
				createQuestion({ testId, question })
			);
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
			if (createQuestion.fulfilled.match(dispatchResult)) {
				const newQuestionWithAnswers: QuestionWithAnswers = {
					id: dispatchResult.payload.id,
					question: dispatchResult.payload.question,
					testId: dispatchResult.payload.testId,
					answers: [],
				};
<<<<<<< HEAD
				setCreatedQuestions((prevQuestions) => [...prevQuestions, newQuestionWithAnswers]);
=======
				setCreatedQuestions((prevQuestions) => [
					...prevQuestions,
					newQuestionWithAnswers,
				]);
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
				setCreatedQuestionId(dispatchResult.payload.id);
				setIsAddingQuestion(true);
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
<<<<<<< HEAD
		[dispatch, editTestId, editQuestion, currentQuestion, setIsEditing, resetError]
=======
		[
			dispatch,
			editTestId,
			editQuestion,
			currentQuestion,
			setIsEditing,
			resetError,
		]
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
	);

	const selectTestForQuestions = (test: Test) => {
		setTestId(test.id);
	};

	const handleQuestionRemove = useCallback(
		(id: QuestionId) => {
			if (testId !== 0) {
				dispatch(deleteQuestion({ testId, id }));
			}
		},
		[dispatch]
	);

	const selectQuestionForAnswers = (question: Question) => {
		setNewAnswer((prevState) => ({
			...prevState,
			questionId: question.id,
			answer: '',
			correct: false,
		}));
	};

	/*const handleUpdateAnswer = (answer: Answer): void => {
		if (answer.id && answer.questionId) {
			dispatch(
				updateAnswerDetails({
					answerId: answer.id,
					questionId: answer.questionId,
					answer: answer.answer,
					correct: answer.correct,
				})
			);
		}
	};*/

	const handleUpdateAnswer = async (answer: Answer) => {
		if (answer.id && answer.questionId) {
			const resultAction = await dispatch(
				updateAnswerDetails({
					answerId: answer.id,
					questionId: answer.questionId,
					answer: answer.answer,
					correct: answer.correct,
				})
			);

			if (updateAnswerDetails.fulfilled.match(resultAction)) {
				setCreatedQuestions((prevQuestions) =>
					prevQuestions.map((q) =>
						q.id === answer.questionId
							? {
									...q,
									answers: q.answers.map((a) =>
										a.id === answer.id
											? {
													...a,
													answer: resultAction.payload.answer,
													correct: resultAction.payload.correct,
													id: resultAction.payload.answerId,
											  }
											: a
									),
							  }
							: q
					)
				);
			} else {
				console.error('Failed to update the answer.');
			}
		}
	};

	const startEditingAnswer = (answerId: number, index: number) => {
		setEditingAnswerId(answerId);
		setEditingAnswerIndex(index);
	};

	const handleRemoveAnswer = async (answerId: number, questionId: number) => {
		const resultAction = await dispatch(
			removeAnswer({
				answerId,
				questionId,
			})
		);

		if (removeAnswer.fulfilled.match(resultAction)) {
			setCreatedQuestions((prevQuestions) =>
				prevQuestions.map((question) =>
					question.id === questionId
						? {
								...question,
<<<<<<< HEAD
								answers: question.answers.filter((answer) => answer.id !== answerId),
=======
								answers: question.answers.filter(
									(answer) => answer.id !== answerId
								),
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
						  }
						: question
				)
			);
		} else {
			console.error('Failed to delete the answer.');
		}
	};

	/*const handleRemoveAnswer = (answer: Answer): void => {
		if (answer.id && answer.questionId) {
			dispatch(removeAnswer({ questionId: answer.questionId, answerId: answer.id }));
		}
	};*/

	const handleAnswerTextChange = (index: number, text: string) => {
<<<<<<< HEAD
		setAnswerTexts(answerTexts.map((answer, idx) => (idx === index ? text : answer)));
=======
		setAnswerTexts(
			answerTexts.map((answer, idx) => (idx === index ? text : answer))
		);
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
	};

	const handleCorrectAnswerIndexChange = (index: number) => {
		setCorrectAnswerIndex(index);
	};

	const handleCreateAnswers = async (questionId: QuestionId) => {
		if (correctAnswerIndex === null) {
			alert('Please select a correct answer.');
			return;
		}
		for (let i = 0; i < answerTexts.length; i++) {
			const text = answerTexts[i];
			const isCorrect = i === correctAnswerIndex;
			if (text.trim() === '') {
				console.error('All answer fields must be filled out.');
				return;
			}

			const resultAction = await dispatch(
				createAnswer({
					questionId,
					answer: text,
					correct: isCorrect,
				})
			);

			if (createAnswer.fulfilled.match(resultAction)) {
				setCreatedQuestions((prevQuestions) =>
					prevQuestions.map((q) =>
<<<<<<< HEAD
						q.id === questionId ? { ...q, answers: [...q.answers, resultAction.payload] } : q
=======
						q.id === questionId
							? { ...q, answers: [...q.answers, resultAction.payload] }
							: q
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
					)
				);
			} else if (createAnswer.rejected.match(resultAction)) {
				alert(`Failed to create answer ${i + 1}.`);
				return;
			}
		}

		setAnswerTexts(['', '', '', '']);
		setCorrectAnswerIndex(null);
		setIsAddingQuestion(false);
	};

	return (
<<<<<<< HEAD
		<div className="testContainer">
			<h2 className={styles.testHeader}>Test List</h2>
			<div className="selectContainer">
				<select
					className="testSelect"
					value={testId}
					onChange={(e) => setTestId(Number(e.target.value))}
				>
					<option value="">Select a test</option>
					{tests.map((test) => (
						<option key={test.id} value={test.id}>
							{test.level}, {test.type}, {test.name}
						</option>
					))}
				</select>
			</div>
			{testId && (
				<div className="selectedTest">
					<strong>Selected Test: </strong>
					<span className="selectedTestName">{tests.find((test) => test.id === testId)?.name}</span>
					<button className="addQuestionButton" onClick={() => setIsAddingQuestion(true)}>
						Add Question +
					</button>
					{isAddingQuestion && (
						<form className="questionForm" onSubmit={handleCreateQuestion}>
							<input
								className="questionInput"
								type="text"
								placeholder="Enter new question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
							/>
							<button className="saveQuestionButton" type="submit">
								Save Question
							</button>
							<button
								className="cancelButton"
								type="button"
								onClick={() => setIsAddingQuestion(false)}
							>
								Cancel
							</button>
						</form>
					)}
				</div>
			)}
			{createdQuestionId && isAddingQuestion && (
				<div className="answersSection">
					<h3>Answers for the new question</h3>
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="answerInputContainer">
							<input
								className="answerInput"
								type="text"
								placeholder={`Answer ${index + 1}`}
								value={answerTexts[index]}
								onChange={(e) => handleAnswerTextChange(index, e.target.value)}
								required
							/>
							<input
								className="correctAnswerRadio"
								type="radio"
								name="correctAnswer"
								checked={correctAnswerIndex === index}
								onChange={() => setCorrectAnswerIndex(index)}
							/>
							<label className="correctAnswerLabel">Correct</label>
						</div>
					))}
					<button
						className="saveAnswersButton"
						onClick={() => handleCreateAnswers(createdQuestionId)}
					>
						Save Answers
					</button>
				</div>
			)}
			{createdQuestions.map((questionWithAnswers) => {
				const isEditingThisQuestion = isEditing && currentQuestion?.id === questionWithAnswers.id;

				return (
					<div key={questionWithAnswers.id} className="questionItem">
						{isEditingThisQuestion ? (
							<form onSubmit={handleUpdateQuestion}>
								<input
									className="questionInput"
									type="text"
									placeholder="Edit question"
									value={editQuestion}
									onChange={(e) => setEditQuestion(e.target.value)}
								/>
								<button className="saveQuestionButton" type="submit">
									Save
								</button>
								<button className="cancelButton" type="button" onClick={() => setIsEditing(false)}>
									Cancel
								</button>
							</form>
						) : (
							<>
								<h4 className="questionText">{questionWithAnswers.question}</h4>
								<button
									className="editQuestionButton"
									onClick={() => startEditingQuestion(questionWithAnswers)}
								>
									Edit
								</button>
								<button
									className="deleteQuestionButton"
									onClick={() => handleQuestionRemove(questionWithAnswers.id)}
								>
									Delete
								</button>
							</>
						)}
						<ul>
							{questionWithAnswers.answers.map((answer) => (
								<li key={answer.id}>
									{answer.answer} - {answer.correct ? 'Correct' : 'Incorrect'}
									<button type="button">Edit</button>
									<button type="button">Delete</button>
=======
		<div className={styles.containerHome}>
			<div className={styles.testContainer}>
				<h2 className={styles.testHeader}>Test List</h2>
				<div className={styles.selectContainer}>
					<select
						className={styles.testSelect}
						value={testId}
						onChange={(e) => setTestId(Number(e.target.value))}
					>
						<option value="">Select a test</option>
						{tests.map((test) => (
							<option key={test.id} value={test.id}>
								{test.level}, {test.type}, {test.name}
							</option>
						))}
					</select>
				</div>
				{testId && (
					<div className={styles.selectedTest}>
						<strong>Selected Test: </strong>
						<span className={styles.electedTestName}>
							{tests.find((test) => test.id === testId)?.name}
						</span>
						<button className={styles.addQuestionButton} onClick={() => setIsAddingQuestion(true)}>
							Add Question
						</button>
						{isAddingQuestion && (
							<form className={styles.questionForm} onSubmit={handleCreateQuestion}>
								<input
									className={styles.questionInput}
									type="text"
									placeholder="Enter new question"
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
								/>
								<button className={styles.saveQuestionButton} type="submit">
									Save Question
								</button>
								<button
									className={styles.cancelButton}
									type="button"
									onClick={() => setIsAddingQuestion(false)}
								>
									Cancel
								</button>
							</form>
						)}
					</div>
				)}
				{createdQuestionId && isAddingQuestion && (
					<div className={styles.answersSection}>
						<h3>Answers for the new question</h3>
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className={styles.answerInputContainer}>
								<input
									className={styles.answerInput}
									type="text"
									placeholder={`Answer ${index + 1}`}
									value={answerTexts[index]}
									onChange={(e) =>
										handleAnswerTextChange(index, e.target.value)
									}
									required
								/>
								<input
									className={styles.correctAnswerRadio}
									type="radio"
									name="correctAnswer"
									checked={correctAnswerIndex === index}
									onChange={() => setCorrectAnswerIndex(index)}
								/>
								<label className={styles.correctAnswerLabel}>Correct</label>
							</div>
						))}
						<button
							className={styles.saveAnswersButton}
							onClick={() => handleCreateAnswers(createdQuestionId)}
						>
							Save Answers
						</button>
					</div>
				)}
				{createdQuestions.map((questionWithAnswers) => (
					<div key={questionWithAnswers.id} className={styles.questionItem}>
						<h4 className={styles.questionText}>{questionWithAnswers.question}</h4>
						<button
							className={styles.editQuestionButton}
							onClick={() => startEditingQuestion(questionWithAnswers)}
						>
							Edit
						</button>
						<button
							className={styles.deleteQuestionButton}
							onClick={() => handleQuestionRemove(questionWithAnswers.id)}
						>
							Delete
						</button>
						<ul className={styles.answerList}>
							{questionWithAnswers.answers.map((answer) => (
								<li key={answer.id} className={styles.answerItem}>
									{answer.answer} - {answer.correct ? 'Correct' : 'Incorrect'}
									<button className={styles.editAnswerButton} type="button">
										Edit
									</button>
									<button className={styles.deleteAnswerButton} type="button">
										Delete
									</button>
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
								</li>
							))}
						</ul>
					</div>
<<<<<<< HEAD
				);
			})}
=======
				))}
			</div>
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
		</div>
	);
}
