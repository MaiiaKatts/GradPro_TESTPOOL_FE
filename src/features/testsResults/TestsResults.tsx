/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, selectTestsResults } from './selectors';
import { loadTestsResult, saveTestResult } from './testsResultsSlice';
import { selectUser } from '../auth/selectors';
import { getUser } from '../auth/authSlice';
import { SelectedAnswers } from '../tests/TestsQuestions';
import { correctAnswer } from '../answers/answersSlice';
import { unwrapResult } from '@reduxjs/toolkit';

interface TestsResultsProps {
	selectedAnswers: SelectedAnswers;
	testId: number;
	showOnlyScore: boolean;
}

export default function TestsResults({
	selectedAnswers,
	testId,
	showOnlyScore,
}: TestsResultsProps): JSX.Element {
	const testResults = useAppSelector(selectTestsResults);
	const currentUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectError);
	const userAnswers = Object.values(selectedAnswers);
	const currentTestResults = testResults.filter((result) => result.testId === testId);
	const latestTestResult = currentTestResults[currentTestResults.length - 1];
	//const latestTestResult = testResults[testResults.length - 1];

	useEffect(() => {
		const saveResults = async () => {
			const answerPromises = Object.entries(selectedAnswers).map(([questionId, answerId]) => {
				const answerData = {
					answerId,
					questionId: Number(questionId),
				};
				return dispatch(correctAnswer(answerData));
			});

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

	return (
		<div>
			<h2>Test Results</h2>
			{showOnlyScore && latestTestResult && latestTestResult.testId === testId ? (
				<div key={latestTestResult.id}>
					<p>Your result: {latestTestResult.score} correct answers</p>
				</div>
			) : (
				testResults.map((result) => (
					<div key={result.id}>
						<p>Date: {result.date}</p>
						<p>Total Correct Answers: {result.totalCorrectAnswer}</p>
						<p>Progress: {result.progressPercent}%</p>
					</div>
				))
			)}
		</div>
	);
}
