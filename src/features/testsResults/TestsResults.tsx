/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, selectTestsResults } from './selectors';
import { loadTestsResult, saveTestResult } from './testsResultsSlice';
import { selectUser } from '../auth/selectors';
import { getUser } from '../auth/authSlice';
import { SelectedAnswers } from '../tests/TestsQuestions';
import { correctAnswer } from '../answers/answersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Question from '../questions/types/Question';
import { loadQuestionWithCorrectAnswer } from '../questions/questionsSlice';
import { CorrectAnswerResponse } from '../questions/api';
import styles from './TestResults.module.css';

interface TestsResultsProps {
	selectedAnswers: SelectedAnswers;
	testId: number;
	showOnlyScore: boolean;
	filteredQuestions: Question[];
}

export default function TestsResults({
	selectedAnswers,
	testId,
	showOnlyScore,
	filteredQuestions,
}: TestsResultsProps): JSX.Element {
	const testResults = useAppSelector(selectTestsResults);
	const currentUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectError);
	const userAnswers = Object.values(selectedAnswers);
	const currentTestResults = testResults.filter(
		(result) => result.testId === testId
	);
	const latestTestResult = currentTestResults[currentTestResults.length - 1];
	const [showDecryption, setShowDecryption] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState<{
		[key: number]: string;
	}>({});
	const [correctAnswersData, setCorrectAnswersData] = useState<
		CorrectAnswerResponse[]
	>([]);

	useEffect(() => {
		const saveResults = async () => {
			const answerPromises = Object.entries(selectedAnswers).map(
				([questionId, answerId]) => {
					const answerData = {
						answerId,
						questionId: Number(questionId),
					};
					return dispatch(correctAnswer(answerData));
				}
			);

			try {
				await Promise.all(answerPromises);

				const resultAction = await dispatch(
					saveTestResult({
						testId,
						userAnswers,
					})
				);
				const response = unwrapResult(resultAction);
				console.log('Результаты теста успешно сохранены:', response);
			} catch (error) {
				console.error('Ошибка:', error);
			}
		};

		if (Object.keys(selectedAnswers).length > 0) {
			saveResults();
		}
	}, [dispatch, selectedAnswers, testId]);
	console.log(
		'latestTestResult in useEffect [dispatch, selectedAnswers, testId]:',
		latestTestResult
	);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	useEffect(() => {
		if (currentUser && currentUser.id) {
			dispatch(loadTestsResult(currentUser.id));
		}
	}, [dispatch, currentUser]);

	if (error) {
		return <div>Error loading test results: {error}</div>;
	}

	const handleShowDecryptionClick = () => {
		setShowDecryption(true);
	};

	/*useEffect(() => {
		const fetchCorrectAnswers = async () => {
			const correctAnswersMap: { [key: number]: string } = {};

			for (const question of filteredQuestions) {
				try {
					const answer = await dispatch(
						correctAnswer({
							questionId: question.id,
							answerId: selectedAnswers[question.id],
						})
					).unwrap();

					if (answer.correct) {
						correctAnswersMap[question.id] = answer.answer;
					}
				} catch (error) {
					console.error(
						`Error fetching correct answer for question ${question.id}:`,
						error
					);
				}
			}
			setCorrectAnswers(correctAnswersMap);
		};

		if (
			filteredQuestions.length > 0 &&
			Object.keys(selectedAnswers).length > 0
		) {
			fetchCorrectAnswers();
		}
	}, [filteredQuestions, selectedAnswers, dispatch]);*/

	useEffect(() => {
		const fetchCorrectAnswers = async () => {
			const questionsWithCorrectAnswers: CorrectAnswerResponse[] =
				await Promise.all(
					filteredQuestions.map(async (question) => {
						try {
							const questionWithCorrectAnswer = await dispatch(
								loadQuestionWithCorrectAnswer(question.id)
							).unwrap();
							return questionWithCorrectAnswer;
						} catch (error) {
							console.error('Ошибка при получении правильного ответа:', error);
							return null;
						}
					})
				).then((results) =>
					results.filter(
						(result): result is CorrectAnswerResponse => result !== null
					)
				);

			setCorrectAnswersData(questionsWithCorrectAnswers);

			const correctAnswersMap = questionsWithCorrectAnswers.reduce<{
				[key: number]: string;
			}>((acc, questionWithCorrectAnswer) => {
				acc[questionWithCorrectAnswer.questionId] =
					questionWithCorrectAnswer.correctAnswerText;
				return acc;
			}, {});

			setCorrectAnswers(correctAnswersMap);
		};

		if (filteredQuestions.length > 0) {
			fetchCorrectAnswers();
		}
	}, [filteredQuestions, dispatch]);

	/*useEffect(() => {
		const fetchCorrectAnswers = async () => {
			const questionsWithCorrectAnswers = await Promise.all(
				filteredQuestions.map(async (question) => {
					try {
						const questionWithCorrectAnswer = await dispatch(
							loadQuestionWithCorrectAnswer(question.id)
						).unwrap();
						console.log(
							'Question with correct answer:',
							questionWithCorrectAnswer
						);

						const transformedData = {
							...questionWithCorrectAnswer,
							question: questionWithCorrectAnswer.questionText,
						};

						return transformedData;
					} catch (error) {
						console.error('Ошибка при получении правильного ответа:', error);
						return null;
					}
				})
			);

			const correctAnswersMap = questionsWithCorrectAnswers.reduce<{
				[key: number]: string;
			}>((acc, questionWithCorrectAnswer) => {
				if (
					questionWithCorrectAnswer &&
					questionWithCorrectAnswer.correctAnswerText
				) {
					acc[questionWithCorrectAnswer.id] =
						questionWithCorrectAnswer.correctAnswerText;
				}
				return acc;
			}, {});

			setCorrectAnswers(correctAnswersMap);
		};

		if (filteredQuestions.length > 0) {
			fetchCorrectAnswers();
		}
	}, [filteredQuestions, dispatch]);*/

	/*useEffect(() => {
		const fetchCorrectAnswers = async () => {
			const questionsWithCorrectAnswers = await Promise.all(
				filteredQuestions.map(async (question) => {
					try {
						const questionWithCorrectAnswer = await dispatch(
							loadQuestionWithCorrectAnswer(question.id)
						).unwrap();
						return questionWithCorrectAnswer;
					} catch (error) {
						console.error('Ошибка при получении правильного ответа:', error);
						return null;
					}
				})
			);

			const correctAnswersMap = questionsWithCorrectAnswers.reduce<{
				[key: number]: string;
			}>((acc, questionWithCorrectAnswer) => {
				if (
					questionWithCorrectAnswer &&
					questionWithCorrectAnswer.correctAnswerText
				) {
					acc[questionWithCorrectAnswer.id] =
						questionWithCorrectAnswer.correctAnswerText;
				}
				return acc;
			}, {});

			setCorrectAnswers(correctAnswersMap);
		};

		if (filteredQuestions.length > 0) {
			fetchCorrectAnswers();
		}
	}, [filteredQuestions, dispatch]);*/

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Test Results:</h2>
			{showOnlyScore &&
			latestTestResult &&
			latestTestResult.testId === testId ? (
				<div key={latestTestResult.id}>
					<p className={styles.result}>
						{latestTestResult.score} correct answers
					</p>
					{!showDecryption && (
						<div className={styles.buttonContainer}>
							<button
								type="button"
								onClick={handleShowDecryptionClick}
								className={styles.button}
							>
								Show description
							</button>
						</div>
					)}
					{showDecryption && (
						<div>
							{filteredQuestions.map((question) => (
								<div key={question.id} className={styles.questionBlock}>
									<h4 className={styles.questionHeading}>
										{question.question}
									</h4>
									<p className={styles.paragraph}>
										Your Answer:{' '}
										{
											question.answerObjects?.find(
												(a) => a.id === selectedAnswers[question.id]
											)?.answer
										}
									</p>
									<p className={styles.correct}>
										Correct Answer: {correctAnswers[question.id]}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			) : null}
		</div>
	);
}
