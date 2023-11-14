/* eslint-disable import/export */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { loadQuestions } from './questionsSlice';
import { loadAllAnswers } from '../answers/answersSlice';
import { selectQuestions } from './selectors';
import { selectAnswers } from '../answers/selector';
import { TestId } from '../tests/types/Test';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

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

	useEffect(() => {
		if (testId) {
			dispatch(loadQuestions());
			dispatch(loadAllAnswers());
		}
	}, [dispatch, testId]);

	return (
		<div className="questions-list">
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
