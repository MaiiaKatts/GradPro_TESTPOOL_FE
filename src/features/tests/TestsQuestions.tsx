/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadRandomQuestions } from '../questions/questionsSlice';
import { selectRandomQuestions } from '../questions/selectors';
import { QuestionId } from '../questions/types/Question';
import TestsResults from '../testsResults/TestsResults';
import { AnswerId } from '../answers/types/answer';
import { useParams } from 'react-router-dom';
import styles from './TestsQuestions.module.css';

export interface SelectedAnswers {
	[key: number]: number;
}

export default function TestsQuestions(): JSX.Element {
	const { testId } = useParams();
	const numTestId = Number(testId);
	const dispatch = useAppDispatch();
	const questions = useAppSelector(selectRandomQuestions);
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
	const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

	useEffect(() => {
		console.log('Effect triggered, numTestId:', numTestId);
		if (numTestId) {
			dispatch(loadRandomQuestions(numTestId));
			console.log('Dispatched loadRandomQuestions with testId:', numTestId);
		}
	}, [dispatch, numTestId]);

	const handleTestCompletion = () => {
		setIsTestCompleted(true);
	};

	const filteredQuestions = questions.filter((q) => q.testId === numTestId);
	console.log('questions: ', filteredQuestions);

	const handleAnswerChange = (questionId: QuestionId, answerId: AnswerId) => {
		setSelectedAnswers({
			...selectedAnswers,
			[questionId]: answerId,
		});
		console.log('New selected answers after change:', selectedAnswers);
	};

	const allAnswered = filteredQuestions.every((question) =>
		selectedAnswers.hasOwnProperty(question.id)
	);
	console.log('answered', allAnswered);

	console.log(
		'Questions and their answers:',
		filteredQuestions.map((q) => ({
			questionId: q.id,
			answers: q.answerObjects?.map((a) => ({
				answerId: a.id,
				answerText: a.answer,
			})),
		}))
	);

	let mainContainerClass = styles.mainContainer;
	if (numTestId >= 1 && numTestId <= 3) {
		mainContainerClass = styles.mainContainerTest1;
	} else if (numTestId >= 4 && numTestId <= 6) {
		mainContainerClass = styles.mainContainerTest2;
	} else if (numTestId >= 7 && numTestId <= 9) {
		mainContainerClass = styles.mainContainerTest3;
	}

	return (
		<div className={styles.container}>
			{!isTestCompleted && (
				<div className={mainContainerClass}>
					{filteredQuestions.map((question) => (
						<div key={question.id} className={styles.question}>
							<h4 className={styles.questionTitle}>{question.question}</h4>
							{question.answerObjects?.map((answer) => (
								<label key={answer.id} className={styles.answerLabel}>
									<input
										className={styles.inputField}
										type="radio"
										name={`question ${question.id}`}
										checked={selectedAnswers[question.id] === answer.id}
										onChange={() => handleAnswerChange(question.id, answer.id)}
									/>
									{answer.answer}
								</label>
							))}
						</div>
					))}
					{allAnswered && (
						<div className={styles.buttonContainer}>
							{numTestId >= 1 && numTestId <= 3 && (
								<button
									type="button"
									aria-label="Get result"
									onClick={handleTestCompletion}
									className={styles.buttonGroup1}
								></button>
							)}
							{numTestId >= 4 && numTestId <= 6 && (
								<button
									type="button"
									aria-label="Get result"
									onClick={handleTestCompletion}
									className={styles.buttonGroup2}
								></button>
							)}
							{numTestId >= 7 && numTestId <= 9 && (
								<button
									type="button"
									aria-label="Get result"
									onClick={handleTestCompletion}
									className={styles.buttonGroup3}
								></button>
							)}
						</div>
					)}
				</div>
			)}
			{isTestCompleted && (
				<div className={styles.testResults}>
					<TestsResults
						selectedAnswers={selectedAnswers}
						testId={numTestId}
						showOnlyScore={true}
					/>
				</div>
			)}
		</div>
	);
}
