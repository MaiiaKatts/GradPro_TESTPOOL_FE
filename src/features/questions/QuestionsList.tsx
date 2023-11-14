<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-redeclare */
=======
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
/* eslint-disable import/export */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
import { loadQuestions } from './questionsSlice';
import { loadAllAnswers } from '../answers/answersSlice';
import { selectQuestions } from './selectors';
import { selectAnswers } from '../answers/selector';
import { TestId } from '../tests/types/Test';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
<<<<<<< HEAD
import { loadTests } from '../tests/testsSlice';
import { selectTests } from '../tests/selectors';
=======
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c

type QuestionsListProps = {
	testId: TestId;
};

export default function QuestionsList({ testId }: QuestionsListProps): JSX.Element {
	const dispatch = useAppDispatch();
	const answers = useAppSelector(selectAnswers);
	const questions = useAppSelector(selectQuestions);
	const filteredQuestions = questions.filter((q) => q.testId === testId);
	const filteredAnswers = answers.filter((a) =>
		filteredQuestions.some((q) => q.id === a.questionId)
	);
<<<<<<< HEAD
	const tests = useAppSelector(selectTests);
	const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

	useEffect(() => {
		dispatch(loadTests());
	}, [dispatch]);
=======
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c

	useEffect(() => {
		if (testId) {
			dispatch(loadQuestions());
			dispatch(loadAllAnswers());
		}
	}, [dispatch, testId]);

<<<<<<< HEAD
	const handleTestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedTestId(Number(event.target.value));
	};

	return (
		<div className="questions-list">
			<select onChange={handleTestChange}>
				<option value="">Выберите тест</option>
				{tests.map((test) => (
					<option key={test.id} value={test.id}>
						{test.name} - {test.type} - {test.level}
					</option>
				))}
			</select>
=======
	return (
		<div className="questions-list">
>>>>>>> fc05efba33f0aab7133a9954e5bb5ee654afde5c
			{filteredQuestions.map((question) => (
				<div key={question.id}>
					<h4>{question.question}</h4>
					{filteredAnswers
						.filter((answer) => answer.questionId === question.id)
						.map((answer) => (
							<p key={answer.id}>
								{answer.answer} - {answer.correct ? 'Correct' : 'Incorrect'}
							</p>
						))}
				</div>
			))}
		</div>
	);
}
