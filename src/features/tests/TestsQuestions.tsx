/* eslint-disable import/no-named-as-default-member */
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
import Question, { QuestionId } from '../questions/types/Question';
import TestsResults from '../testsResults/TestsResults';
import { AnswerId } from '../answers/types/answer';
import { useParams } from 'react-router-dom';

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
	const [
		filteredQuestionsAfterCompletion,
		setFilteredQuestionsAfterCompletion,
	] = useState<Question[]>([]);

	useEffect(() => {
		console.log('Effect triggered, numTestId:', numTestId);
		if (numTestId) {
			dispatch(loadRandomQuestions(numTestId));
			console.log('Dispatched loadRandomQuestions with testId:', numTestId);
		}
	}, [dispatch, numTestId]);

	const filteredQuestions = questions.filter((q) => q.testId === numTestId);
	console.log('questions: ', filteredQuestions);

	const handleTestCompletion = () => {
		setIsTestCompleted(true);
		setFilteredQuestionsAfterCompletion(filteredQuestions);
	};

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

	return (
		<div>
			{!isTestCompleted && (
				<div>
					{filteredQuestions.map((question) => (
						<div key={question.id}>
							<h4>{question.question}</h4>
							{question.answerObjects?.map((answer) => (
								<label key={answer.id}>
									<input
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
						<button type="button" onClick={handleTestCompletion}>
							Get result
						</button>
					)}
				</div>
			)}
			{isTestCompleted && (
				<TestsResults
					selectedAnswers={selectedAnswers}
					testId={numTestId}
					showOnlyScore={true}
					filteredQuestions={filteredQuestions}
				/>
			)}
		</div>
	);
}
