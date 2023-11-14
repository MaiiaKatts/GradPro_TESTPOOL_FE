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
import { createTest, deleteTest, loadTests, resetError, updateTest } from './testsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTasks } from '../tasks/selectors';
import { loadTasksOfAll } from '../tasks/tasksSlice';
import { TaskId } from '../tasks/types/Task';
import { selectTests, selectError } from './selectors';
import Test, { TestId } from './types/Test';
import Question, { QuestionId } from '../questions/types/Question';
import { selectQuestions, selectRandomQuestions } from '../questions/selectors';
import { createQuestion, deleteQuestion, updateQuestion } from '../questions/questionsSlice';
import { selectAnswers } from '../answers/selector';
import Answer from '../answers/types/answer';
import { createAnswer, removeAnswer, updateAnswerDetails } from '../answers/answersSlice';
import styles from './CreateTestForm.module.css';
import QuestionsList from '../questions/QuestionsList';

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
	const [createdQuestionId, setCreatedQuestionId] = useState<number | null>(null);
	const [createdQuestions, setCreatedQuestions] = useState<QuestionWithAnswers[]>([]);
	const randomQuestions = useAppSelector(selectRandomQuestions);
	const [testId, setTestId] = useState<number>(0);
	const [question, setQuestion] = useState<string>('');
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [editTestId, setEditTestId] = useState<number>(0);
	const [editQuestion, setEditQuestion] = useState<string>('');
	const [isAddingQuestion, setIsAddingQuestion] = useState(false);
	const answers = useAppSelector(selectAnswers);
	const [answerTexts, setAnswerTexts] = useState(['', '', '', '']);
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
	const [newAnswer, setNewAnswer] = useState<Answer>({
		answer: '',
		correct: false,
		questionId: 0,
	});
	const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
	const [editingAnswerIndex, setEditingAnswerIndex] = useState<number | null>(null);

	useEffect(() => {
		dispatch(loadTests());
	}, [dispatch]);

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
			const dispatchResult = await dispatch(createQuestion({ testId, question }));
			if (createQuestion.fulfilled.match(dispatchResult)) {
				const newQuestionWithAnswers: QuestionWithAnswers = {
					id: dispatchResult.payload.id,
					question: dispatchResult.payload.question,
					testId: dispatchResult.payload.testId,
					answers: [],
				};
				setCreatedQuestions((prevQuestions) => [...prevQuestions, newQuestionWithAnswers]);
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
		[dispatch, editTestId, editQuestion, currentQuestion, setIsEditing, resetError]
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
								answers: question.answers.filter((answer) => answer.id !== answerId),
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
		setAnswerTexts(answerTexts.map((answer, idx) => (idx === index ? text : answer)));
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
						q.id === questionId ? { ...q, answers: [...q.answers, resultAction.payload] } : q
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
		<div className="test-container">
			<h2>Test List</h2>
			<div>
				<select value={testId} onChange={(e) => setTestId(Number(e.target.value))}>
					<option value="">Select a test</option>
					{tests.map((test) => (
						<option key={test.id} value={test.id}>
							{test.level}, {test.type}, {test.name}
						</option>
					))}
				</select>
			</div>
			{testId && (
				<div>
					<strong>Selected Test: </strong>
					<span>{tests.find((test) => test.id === testId)?.name}</span>
					<button onClick={() => setIsAddingQuestion(true)}>Add Question +</button>
					{isAddingQuestion && (
						<form onSubmit={handleCreateQuestion}>
							<input
								type="text"
								placeholder="Enter new question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
							/>
							<button type="submit">Save Question</button>
							<button type="button" onClick={() => setIsAddingQuestion(false)}>
								Cancel
							</button>
						</form>
					)}
				</div>
			)}
			{createdQuestionId && isAddingQuestion && (
				<div>
					<h3>Answers for the new question</h3>
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index}>
							<input
								type="text"
								placeholder={`Answer ${index + 1}`}
								value={answerTexts[index]}
								onChange={(e) => handleAnswerTextChange(index, e.target.value)}
								required
							/>
							<input
								type="radio"
								name="correctAnswer"
								checked={correctAnswerIndex === index}
								onChange={() => setCorrectAnswerIndex(index)}
							/>
							<label>Correct</label>
						</div>
					))}
					<button onClick={() => handleCreateAnswers(createdQuestionId)}>Save Answers</button>
				</div>
			)}
			{createdQuestions.map((questionWithAnswers) => (
				<div key={questionWithAnswers.id}>
					<h4>{questionWithAnswers.question}</h4>
					<button onClick={() => startEditingQuestion(questionWithAnswers)}>Edit</button>
					<button onClick={() => handleQuestionRemove(questionWithAnswers.id)}>Delete</button>
					<ul>
						{questionWithAnswers.answers.map((answer) => (
							<li key={answer.id}>
								{answer.answer} - {answer.correct ? 'Correct' : 'Incorrect'}
								<button type="button">Edit</button>
								<button type="button">Delete</button>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
