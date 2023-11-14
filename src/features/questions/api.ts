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

	return res.json();
}

export async function createQuestion(testId: TestId, question: string): Promise<Question> {
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

export async function updateQuestion(testId: TestId, question: Question): Promise<Question> {
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

export async function deleteQuestion(testId: TestId, question_id: QuestionId): Promise<Question> {
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
