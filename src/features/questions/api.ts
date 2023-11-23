/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerId } from './../answers/types/answer';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TestId } from './../tests/types/Test';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Question, { QuestionId } from './types/Question';

export async function getAllQuestions(): Promise<Question[]> {
	const res = await fetch('/api/questions');

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}

	return res.json();
}

export interface CorrectAnswerResponse {
	questionId: number;
	correctAnswerId: number;
	questionText: string;
	correctAnswerText: string;
}

export async function getQuestionWithCorrectAnswer(
	questionId: number
): Promise<CorrectAnswerResponse> {
	const res = await fetch(
		`/api/questions/with_correct_answer/{question_id}?question_id=${questionId}`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
		}
	);
	const data: CorrectAnswerResponse = await res.json();
	return data;
}

interface QuestionResponse {
	id: number;
	question: string;
	answerId1: AnswerId;
	answer1: string;
	answerId2: AnswerId;
	answer2: string;
	answerId3: AnswerId;
	answer3: string;
	answerId4: AnswerId;
	answer4: string;
}

export async function getRandomQuestions(testId: TestId): Promise<Question[]> {
	const res = await fetch(`/api/tests/${testId}/questions/randomQuestions`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	});

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}

	const data: QuestionResponse[] = await res.json();

	return data.map((item) => ({
		id: item.id,
		testId,
		question: item.question,
		answers: [item.answer1, item.answer2, item.answer3, item.answer4],
		answerObjects: [
			{ id: item.answerId1, answer: item.answer1 },
			{ id: item.answerId2, answer: item.answer2 },
			{ id: item.answerId3, answer: item.answer3 },
			{ id: item.answerId4, answer: item.answer4 },
		],
	}));
}

export async function createQuestion(
	testId: TestId,
	question: string
): Promise<Question> {
	const res = await fetch(`/api/tests/${testId}/questions`, {
		method: 'POST',
		body: JSON.stringify({ testId, question }),
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
	});

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}

export async function updateQuestion(
	testId: TestId,
	question: Question
): Promise<Question> {
	const res = await fetch(`/api/tests/${testId}/questions/${question.id}`, {
		method: 'PUT',
		body: JSON.stringify({
			question: question.question,
			testId: question.testId,
		}),
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

	return res.json();
}

export async function deleteQuestion(
	testId: TestId,
	question_id: QuestionId
): Promise<Question> {
	const res = await fetch(`/api/tests/${testId}/questions/${question_id}`, {
		method: 'DELETE',
	});

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}
