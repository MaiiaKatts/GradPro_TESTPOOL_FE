/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadRandomQuestions } from '../questions/questionsSlice';
import { selectRandomQuestions } from '../questions/selectors';
import { QuestionId } from '../questions/types/Question';

interface SelectedAnswers {
	[key: number]: number;
}

export default function TestsQuestions(): JSX.Element {
	const { testId } = useParams();
	const numTestId = Number(testId);
	const dispatch = useAppDispatch();
	const questions = useAppSelector(selectRandomQuestions);
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

	useEffect(() => {
		console.log('Effect triggered, numTestId:', numTestId);
		if (numTestId) {
			dispatch(loadRandomQuestions(numTestId));
			console.log('Dispatched loadRandomQuestions with testId:', numTestId);
		}
	}, [dispatch, numTestId]);

	/*useEffect(() => {
		console.log('Questions in component:', questions);
	}, [questions]);*/

	const filteredQuestions = questions.filter((q) => q.testId === numTestId);
	console.log('questions: ', filteredQuestions);

	const handleAnswerChange = (questionId: QuestionId, answerId: number) => {
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

	return (
		<div>
			{filteredQuestions.map((question) => (
				<div key={question.id}>
					<h4>{question.question}</h4>
					{question.answers?.map((answer, index) => (
						<label key={index}>
							<input
								type="radio"
								name={`question ${question.id}`}
								checked={selectedAnswers[question.id] === index}
								onChange={() => handleAnswerChange(question.id, index)}
							/>
							{answer}
						</label>
					))}
				</div>
			))}
			{allAnswered && <button type="button">Get result</button>}
		</div>
	);
}
